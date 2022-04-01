package route

import (
	chathandlers "goapi/chat/handlers"
	"goapi/handler"
	"goapi/model"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func Init() *echo.Echo {

	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAcceptEncoding},
		AllowMethods: []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodDelete},
	}))

	e.HTTPErrorHandler = handler.JSONHTTPErrorHandler

	v1 := e.Group("/api/v1")
	{
		v1.GET("/users", model.GetUsers)
		v1.GET("/user/:id", model.GetUser)
		v1.PUT("/user/:id", model.UpdateUser)
		v1.POST("/user", model.CreateUser)
		v1.DELETE("/user/:id", model.DeleteUser)
		v1.POST("/signin", model.Signin)

		v1.GET("/groups", model.GetGroups)
		v1.GET("/group/:groupid", model.GetGroup)
		v1.PUT("/group/:groupid", model.UpdateGroup)
		v1.POST("/group", model.CreateGroup)
		v1.DELETE("/group/:groupid", model.DeleteGroup)

		v1.GET("/members", model.GetMembers)
		v1.GET("/member/:userid", model.GetUserGroup)
		v1.GET("/members/:groupid", model.GetGroupMembers)
		v1.PUT("/member/:groupid/:userid", model.UpdateMember)
		v1.POST("/member/:groupid", model.CreateMember)
		v1.DELETE("/member/:groupid/:userid", model.DeleteMember)

		v1.GET("/rooms", model.GetRooms)
		v1.GET("/room/:roomid", model.GetRoom)
		v1.GET("/rooms/:groupid", model.GetGroupRooms)
		v1.PUT("/room/:roomid", model.Updateroom)
		v1.POST("/room/:groupid", model.Createroom)
		v1.DELETE("/room/:roomid", model.Deleteroom)

		v1.GET("/events", model.GetEvents)
		v1.GET("/event/:groupid/:eventid", model.GetEvent)
		v1.GET("/events/:groupid", model.GetGroupEvents)
		v1.PUT("/event/:groupid/:eventid", model.UpdateEvent)
		v1.POST("/event/:groupid", model.CreateEvent)
		v1.DELETE("/event/:groupid/:eventid", model.DeleteEvent)

		v1.GET("/message/:roomid", model.GetRoomMessages)
		v1.PUT("/message/:roomid/:messageid", model.UpdateMessage)
		v1.POST("/message", model.CreateMessage)
		v1.DELETE("/message/:messageid", model.DeleteMessage)

		v1.GET("/ws", chathandlers.WsEndpoint)
	}
	return e
}
