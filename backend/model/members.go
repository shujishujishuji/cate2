package model

import (
	"goapi/db"
	"net/http"

	"github.com/labstack/echo/v4"
)

type Member struct {
	GroupId int `json:"groupid" param:"groupid"`
	UserId  int `json:"userid" param:"userid"`
}

// 全メンバーを取得
func GetMembers(c echo.Context) error {
	members := []Member{}
	db.DB.Find(&members)
	return c.JSON(http.StatusOK, members)
}

// グループIDからメンバーを取得
func GetGroupMembers(c echo.Context) error {
	members := []Member{}
	gid := c.Param("groupid")
	db.DB.Find(&members, "group_id = ?", gid)
	return c.JSON(http.StatusOK, members)
}

// ユーザIDからグループを取得
func GetUserGroup(c echo.Context) error {
	groups := []Member{}
	uid := c.Param("userid")
	db.DB.Find(&groups, "user_id = ?", uid)
	return c.JSON(http.StatusOK, groups)
}

// メンバーデータを更新
func UpdateMember(c echo.Context) error {
	member := Member{}
	if err := c.Bind(&member); err != nil {
		return err
	}
	gid := c.Param("groupid")
	uid := c.Param("userid")
	db.DB.Where("group_id = ?", gid).Where("user_id = ?", uid).Save(&member)
	return c.JSON(http.StatusOK, member)
}

// メンバーを登録
func CreateMember(c echo.Context) error {
	member := Member{}
	if err := c.Bind(&member); err != nil {
		return err
	}
	db.DB.Create(&member)
	return c.JSON(http.StatusCreated, member)
}

// メンバー削除
func DeleteMember(c echo.Context) error {
	gid := c.Param("groupid")
	uid := c.Param("userid")
	db.DB.Where("group_id = ?", gid).Where("user_id = ?", uid).Delete(&Member{})
	return c.NoContent(http.StatusNoContent)
}
