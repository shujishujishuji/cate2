package model

import (
	"goapi/db"
	"net/http"

	"github.com/labstack/echo/v4"
)

type Event struct {
	GroupId   int    `json:"groupid" param:"groupid"`
	EventId   int    `json:"eventid" param:"eventid"`
	Title     string `json:"title"`
	Contents  string `json:"contents"`
	StartTime string `json:"starttime"`
}

// 全イベントを取得
func GetEvents(c echo.Context) error {
	events := []Event{}
	db.DB.Find(&events)
	return c.JSON(http.StatusOK, events)
}

func GetGroupEvents(c echo.Context) error {
	events := []Event{}
	gid := c.Param("groupid")
	db.DB.Find(&events, "group_id = ?", gid)
	return c.JSON(http.StatusOK, events)
}

// IDからイベントを取得
func GetEvent(c echo.Context) error {
	event := Event{}
	gid := c.Param("groupid")
	eid := c.Param("eventid")
	db.DB.Where("group_id = ?", gid).Where("event_id = ?", eid).First(&event)
	return c.JSON(http.StatusOK, event)
}

// イベントデータを更新
func UpdateEvent(c echo.Context) error {
	event := Event{}
	if err := c.Bind(&event); err != nil {
		return err
	}
	gid := c.Param("groupid")
	eid := c.Param("eventid")
	db.DB.Where("group_id = ?", gid).Where("event_id = ?", eid).Save(&event)
	return c.JSON(http.StatusOK, event)
}

// イベントを登録
func CreateEvent(c echo.Context) error {
	event := Event{}
	if err := c.Bind(&event); err != nil {
		return err
	}
	db.DB.Create(&event)
	return c.JSON(http.StatusCreated, event)
}

// イベント削除
func DeleteEvent(c echo.Context) error {
	gid := c.Param("groupid")
	eid := c.Param("eventid")
	db.DB.Where("group_id = ?", gid).Where("event_id = ?", eid).Delete(&Event{})
	return c.NoContent(http.StatusNoContent)
}
