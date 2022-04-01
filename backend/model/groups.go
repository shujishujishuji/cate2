package model

import (
	"goapi/db"
	"net/http"

	"github.com/labstack/echo/v4"
)

type Group struct {
	GroupId   int    `json:"groupid" param:"groupid"`
	AdminId   int    `json:"adminid"`
	Groupname string `json:"groupname"`
}

// 全グループを取得
func GetGroups(c echo.Context) error {
	groups := []Group{}
	db.DB.Find(&groups)
	return c.JSON(http.StatusOK, groups)
}

// IDからグループを取得(URLパラメータ)
func GetGroup(c echo.Context) error {
	group := Group{}
	id := c.Param("groupid")
	db.DB.Where("group_id = ?", id).First(&group)
	return c.JSON(http.StatusOK, group)
}

// グループデータを更新(URLパラメータ)
func UpdateGroup(c echo.Context) error {
	group := Group{}
	if err := c.Bind(&group); err != nil {
		return err
	}
	id := c.Param("groupid")
	db.DB.Where("group_id = ?", id).Save(&group)
	return c.JSON(http.StatusOK, group)
}

// グループを登録
func CreateGroup(c echo.Context) error {
	group := Group{}
	if err := c.Bind(&group); err != nil {
		return err
	}
	db.DB.Create(&group)
	return c.JSON(http.StatusCreated, group)
}

// グループ削除
func DeleteGroup(c echo.Context) error {
	id := c.Param("groupid")
	db.DB.Delete(&Group{}, id)
	return c.NoContent(http.StatusNoContent)
}
