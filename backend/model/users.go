package model

import (
	"goapi/db"
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
)

type User struct {
	UserId    int    `json:"id" param:"id"`
	Firstname string `json:"firstname"`
	Lastname  string `json:"lastname"`
	Email     string `json:"email"`
	Password  string `json:"password"`
}

type SigninUser struct {
	UserId   int    `json:"userid" param:"id"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

// 全ユーザを取得
func GetUsers(c echo.Context) error {
	users := []User{}
	db.DB.Find(&users)
	return c.JSON(http.StatusOK, users)
}

// IDからユーザを取得
func GetUser(c echo.Context) error {
	user := User{}
	id := c.Param("id")
	db.DB.Where("user_id = ?", id).First(&user)
	return c.JSON(http.StatusOK, user)
}

// ユーザデータを更新
func UpdateUser(c echo.Context) error {
	user := User{}
	if err := c.Bind(&user); err != nil {
		return err
	}
	id := c.Param("id")
	db.DB.Where("user_id = ?", id).Save(&user)
	return c.JSON(http.StatusOK, user)
}

// ユーザを登録
func CreateUser(c echo.Context) error {
	user := User{}
	if err := c.Bind(&user); err != nil {
		return err
	}
	db.DB.Create(&user)
	return c.JSON(http.StatusCreated, user)
}

// ユーザ削除
func DeleteUser(c echo.Context) error {
	id := c.Param("id")
	db.DB.Delete(&User{}, id)
	return c.NoContent(http.StatusNoContent)
}

// ユーザーを一件取得
func FindUser(email string) User {
	var user User
	db.DB.First(&user, "email = ?", email)
	return user
}

// サインイン用関数
func Signin(c echo.Context) error {
	SigninUser := SigninUser{}
	if err := c.Bind(&SigninUser); err != nil {
		return err
	}
	log.Println(SigninUser)
	// DBから取得したパスワード
	signinuser := FindUser(SigninUser.Email)
	dbPassword := signinuser.Password
	formPassword := SigninUser.Password

	// パスワード比較
	if dbPassword == formPassword {
		log.Println("ログインできました")
		return c.JSON(http.StatusOK, signinuser)
	}

	log.Println("ログインできませんでした")
	return c.JSON(http.StatusNotAcceptable, signinuser)
}
