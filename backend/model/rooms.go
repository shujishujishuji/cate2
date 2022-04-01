package model

import (
	"goapi/db"
	"net/http"

	"github.com/labstack/echo/v4"
)

type Room struct {
	GroupId  int    `json:"groupid" param:"groupid"`
	AdminId  int    `json:"adminid"`
	RoomId   int    `json:"roomid"`
	Roomname string `json:"roomname"`
}

// 全ルームを取得
func GetRooms(c echo.Context) error {
	rooms := []Room{}
	db.DB.Find(&rooms)
	return c.JSON(http.StatusOK, rooms)
}

// グループIDからメンバーを取得
func GetGroupRooms(c echo.Context) error {
	rooms := []Room{}
	gid := c.Param("groupid")
	db.DB.Find(&rooms, "group_id = ?", gid)
	return c.JSON(http.StatusOK, rooms)
}

// IDからルームを取得
func GetRoom(c echo.Context) error {
	room := Room{}
	id := c.Param("roomid")
	db.DB.Where("room_id = ?", id).First(&room)
	return c.JSON(http.StatusOK, room)
}

// ルームデータを更新
func Updateroom(c echo.Context) error {
	room := Room{}
	if err := c.Bind(&room); err != nil {
		return err
	}
	id := c.Param("roomid")
	db.DB.Where("room_id = ?", id).Save(&room)
	return c.JSON(http.StatusOK, room)
}

// ルームを登録
func Createroom(c echo.Context) error {
	room := Room{}
	if err := c.Bind(&room); err != nil {
		return err
	}
	db.DB.Create(&room)
	return c.JSON(http.StatusCreated, room)
}

// ルーム削除
func Deleteroom(c echo.Context) error {
	id := c.Param("roomid")
	db.DB.Delete(&Room{}, id)
	return c.NoContent(http.StatusNoContent)
}
