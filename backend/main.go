package main

import (
	chathandlers "goapi/chat/handlers"
	"goapi/route"

	"github.com/sirupsen/logrus"
)

func init() {
	logrus.SetLevel(logrus.DebugLevel)
	logrus.SetFormatter(&logrus.JSONFormatter{})
}

func main() {
	router := route.Init()
	go chathandlers.ListenToWsChannel()

	router.Logger.Fatal(router.Start(":1323"))
}
