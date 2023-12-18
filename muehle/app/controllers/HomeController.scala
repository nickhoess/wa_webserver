package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import de.htwg.se.muehle.controller.ControllerComponent.ControllerBaseImpl.Controller
import de.htwg.se.muehle.controller.ControllerComponent._
import de.htwg.se.muehle.model.FieldComponent.FieldBaseImpl.Field
import de.htwg.se.muehle.aview.TUI
import de.htwg.se.muehle.model.FieldComponent.{MuehlMatrix, Piece, Player}
import play.api.data.Forms._
import scala.io.StdIn.readLine
import play.api.libs.json._

import play.api.libs.streams.ActorFlow
import akka.actor.ActorSystem
import akka.stream.Materializer
import akka.actor._

import scala.swing.Reactor


/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(val controllerComponents: ControllerComponents, implicit val system: ActorSystem) extends BaseController {

  var field = new Field
  var controller = new Controller(field)


  class MuehleWebSocketActor(out: ActorRef) extends Actor with Reactor {
  listenTo(controller)
  def receive = {
    case msg: JsValue =>
      out ! msg
    }
  
  override def postStop(): Unit = {
    MuehleWebSocketActorFactory.actors -= out
  }

    reactions += {
        case event: fieldchange => 
          //out ! sendJsonToClient

          println("Event received: " + event)

          val jsonMatrix = getJsonMatrix
         
          MuehleWebSocketActorFactory.sendToAll(jsonMatrix)
        }
  }

  object MuehleWebSocketActorFactory {
    var actors: Set[ActorRef] = Set()
    def create(out: ActorRef) = {
      actors += out
      println("Actor created. Total actors: " + actors.size)
      Props(new MuehleWebSocketActor(out))
    }

    def sendToAll(message: JsValue): Unit = {
    actors.foreach(_ ! message)
    }
  }

  def socket = WebSocket.accept[JsValue, JsValue] { request =>
    ActorFlow.actorRef { out =>
    println("Request received: " + request)
    MuehleWebSocketActorFactory.create(out)
    }
  }

  def getJsonMatrix: JsValue = {
    val jsonMatrixCell = controller.field.matr.cellsToJsonString().noSpaces
    val jsonMatrixMiddle = controller.field.matr.middleToJsonString().noSpaces

    val jsonMatrixCellPlay = Json.parse(jsonMatrixCell) // Konvertiert das io.circe.Json-Objekt in ein play.api.libs.json.JsValue
    val jsonMatrixMiddlePlay = Json.parse(jsonMatrixMiddle) // Konvertiert das io.circe.Json-Objekt in ein play.api.libs.json.JsValue

    val playerStatus = Json.toJson(controller.field.playerstatus.toString) // Ersetzen Sie controller.playerStatus durch den tatsächlichen Wert
    val gameStatus = Json.toJson(controller.field.gamestatus.toString) // Ersetzen Sie controller.gameStatus durch den tatsächlichen Wert

    val combinedJson = jsonMatrixCellPlay.as[JsObject] ++ jsonMatrixMiddlePlay.as[JsObject] ++ Json.obj("playerStatus" -> playerStatus, "gameStatus" -> gameStatus) // Fügt die beiden JSON-Objekte und die neuen Werte zusammen

    println("JSON: " + combinedJson)
    combinedJson
  }

  def index = Action { implicit request: Request[AnyContent] =>
    getJsonMatrix
    Ok(views.html.index())
  }

  def getJson = Action { implicit request: Request[AnyContent] =>
    Ok(getJsonMatrix)
  }

  def put() = Action { implicit request: Request[AnyContent] =>
      val col = 0
      val row = 0
      controller.put(Some(controller.field.playerstatus), row, col)
      Ok(getJsonMatrix)
  }

  def take() = Action { implicit request: Request[AnyContent] =>
      val col = 0
      val row = 0
      controller.take(Some(controller.field.playerstatus), row, col)
      Ok(getJsonMatrix)
  }

  def move() = Action { implicit request: Request[AnyContent] =>
      val col = 0
      val row = 0
      val colNew = 0
      val rowNew = 1
      controller.move(Some(controller.field.playerstatus), row, col, rowNew, colNew)
      Ok(getJsonMatrix)
  }
  

}
