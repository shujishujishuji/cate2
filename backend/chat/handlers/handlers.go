package handlers

import (
	"fmt"
	"goapi/chat/domain"
	"goapi/model"
	"log"
	"net/http"
	"sort"

	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
)

var (
	// ペイロードチャネルを作成
	wsChan = make(chan domain.WsPayload)

	// コネクションマップを作成
	// keyはコネクション情報, valueにはユーザー名を入れる
	clients = make(map[domain.WebScoketConnection]string)
)

// wsコネクションの基本設定
var upgradeConnection = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

// WebSocketsのエンドポイント
func WsEndpoint(c echo.Context) error {
	// HTTPサーバーコネクションをWebSocketsプロトコルにアップグレード
	ws, err := upgradeConnection.Upgrade(c.Response(), c.Request(), nil)
	if err != nil {
		log.Println(err)
		return err
	}

	log.Println("OK Client Connecting")

	var response domain.WsJsonResponse
	response.Message = `<li>Connected to server</li>`

	// コネクション情報を格納
	conn := domain.WebScoketConnection{Conn: ws}
	// ブラウザが読み込まれた時に一度だけ呼び出されるのでユーザ名なし
	clients[conn] = ""
	log.Println(clients)

	err = ws.WriteJSON(response)
	if err != nil {
		log.Println(err)
		return err
	}

	go ListenForWs(&conn)
	return err
}

func ListenForWs(conn *domain.WebScoketConnection) {
	defer func() {
		// goroutineでパニックが起きた時に起動する
		if r := recover(); r != nil {
			log.Println("Error", fmt.Sprintf("%v", r))
		}
	}()

	var payload domain.WsPayload

	for {
		// payloadを読み込む
		err := conn.ReadJSON(&payload)

		if err != nil {
			// payloadがない場合、何もしない
		} else {
			// payloadがある場合
			payload.Conn = *conn
			// チャネルにpayloadを渡す
			wsChan <- payload
		}
	}
}

func ListenToWsChannel() {
	var response domain.WsJsonResponse

	for {
		// メッセージが入るまで、ここでブロック
		e := <-wsChan

		switch e.Action {
		case "username":
			// ここで、コネクションのユーザー名を格納
			log.Println("username")
			clients[e.Conn] = e.Username
			users := getUserList()
			response.Action = "list_users"
			response.ConnectedUsers = users
			broadcastToAll(response)

		case "left":
			fmt.Println("####left")
			response.Action = "list_users"
			// clientsからユーザーを削除
			delete(clients, e.Conn)
			users := getUserList()
			response.ConnectedUsers = users
			broadcastToAll(response)

		case "broadcast":
			log.Println("broadcast")
			response.Action = "broadcast"
			response.Message = fmt.Sprintf(
				"<li class='replace'><strong>%s</strong>: %s</li>",
				e.Username,
				e.Message)
			// 送信されたメッセージはデータベースに保存
			msg := model.Message{}
			msg.Message = e.Message
			msg.Username = e.Username
			msg.RoomId = e.RoomId
			msg.UserId = e.UserId
			model.RegistMessage(msg)
			broadcastToAll(response)
		}
	}
}

func getUserList() []string {
	var clientList []string
	for _, client := range clients {
		if client != "" {
			clientList = append(clientList, client)
		}
	}
	sort.Strings(clientList)
	return clientList
}

// 全てのユーザーにメッセージを返す
func broadcastToAll(response domain.WsJsonResponse) {
	// clientsには全ユーザーのコネクション情報が格納されている
	for client := range clients {
		err := client.WriteJSON(response)
		if err != nil {
			log.Println("websockets err")
			_ = client.Close()
			// clients Mapからclientの情報を消す
			delete(clients, client)
		}
	}
}
