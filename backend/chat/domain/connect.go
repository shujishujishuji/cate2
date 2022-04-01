package domain

import "github.com/gorilla/websocket"

// WebSocketsからの返却用データの構造体
type WsJsonResponse struct {
	Action         string   `json:"action"`
	Message        string   `json:"message"`
	ConnectedUsers []string `json:"connected_users"`
}

// WebSocketsコネクション情報を格納
type WebScoketConnection struct {
	*websocket.Conn
}

// WebSockets送信データを格納
type WsPayload struct {
	Action    string              `json:"action"`
	Message   string              `json:"message"`
	Username  string              `json:"username"`
	MessageId int                 `json:"messageid" param:"messageid"`
	RoomId    int                 `json:"roomid" param:"roomid"`
	UserId    int                 `json:"userid"`
	Conn      WebScoketConnection `json:"-"`
}
