package model

import (
	"goapi/db"
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
)

type Message struct {
	MessageId int    `json:"messageid" param:"messageid"`
	RoomId    int    `json:"roomid" param:"roomid"`
	UserId    int    `json:"userid"`
	Username  string `json:"username"`
	Message   string `json:"message"`
}

// ルームIDからメッセージを取得
func GetRoomMessages(c echo.Context) error {
	messages := []Message{}
	rid := c.Param("roomid")
	db.DB.Find(&messages, "room_id = ?", rid)
	return c.JSON(http.StatusOK, messages)
}

// メッセージデータを更新
func UpdateMessage(c echo.Context) error {
	messages := Message{}
	if err := c.Bind(&messages); err != nil {
		return err
	}
	rid := c.Param("roomid")
	mid := c.Param("messageid")
	db.DB.Where("room_id = ?", rid).Where("message_id = ?", mid).Save(&messages)
	return c.JSON(http.StatusOK, messages)
}

// メッセージを登録
func CreateMessage(c echo.Context) error {
	message := Message{}
	if err := c.Bind(&message); err != nil {
		return err
	}
	db.DB.Create(&message)
	return c.JSON(http.StatusCreated, message)
}

func RegistMessage(m Message) error {
	log.Println(m)
	db.DB.Create(&m)
	return nil
}

// ルーム削除
func DeleteMessage(c echo.Context) error {
	id := c.Param("messageid")
	db.DB.Delete(&Message{}, id)
	return c.NoContent(http.StatusNoContent)
}
