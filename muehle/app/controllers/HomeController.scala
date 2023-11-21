package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import de.htwg.se.muehle.controller.ControllerComponent.ControllerBaseImpl.Controller
import de.htwg.se.muehle.model.FieldComponent.FieldBaseImpl.Field
import de.htwg.se.muehle.aview.TUI
import de.htwg.se.muehle.model.FieldComponent.{MuehlMatrix, Piece, Player}
import play.api.data.Forms._
import scala.io.StdIn.readLine
import play.api.libs.json._


/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

  var field = new Field
  var controller = new Controller(field)
  
  /**
   * Create an Action to render an HTML page.
   *
   * The configuration in the `routes` file means that this method
   * will be called when the application receives a `GET` request with
   * a path of `/`.
   */
  def index() = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.index())
  }

  def rules() = Action { implicit request: Request[AnyContent] => 
    Ok(views.html.rules())
  }

  def board() = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.board(controller))
  }

  def game() = Action { implicit request: Request[AnyContent] => 
    Ok(views.html.game("MILL GAME"))
  }

  def htmlGame() = Action { implicit request: Request[AnyContent] => 
    Ok(views.html.htmlGame())
  }

  def put() = Action(parse.json) { request =>
    val jsonBody = request.body
    val param1 = (jsonBody \ "param1").as[Int]
    val param2 = (jsonBody \ "param2").as[Int]
    println(param1)
    println(param2)
    println(controller.field.playerstatus)
    controller.put(Some(controller.field.playerstatus), param1 , param2)
    val playerStatusString = controller.field.playerstatus.toString
    val gameStatusString = controller.field.gamestatus.toString
    val result = Json.obj(
      "value1" -> Json.toJson(playerStatusString),
      "value2" -> Json.toJson(gameStatusString)
    )
    Ok(result)
  }

  def take() = Action(parse.json) { request =>
    val jsonBody = request.body
    val param1 = (jsonBody \ "param1").as[Int]
    val param2 = (jsonBody \ "param2").as[Int]
    println(param1)
    println(param2)
    println(controller.field.playerstatus)
    controller.take(Some(controller.field.playerstatus), param1 , param2)
    val playerStatusString = controller.field.playerstatus.toString
    val gameStatusString = controller.field.gamestatus.toString
    println(gameStatusString)
    val result = Json.obj(
      "value1" -> Json.toJson(playerStatusString),
      "value2" -> Json.toJson(gameStatusString)
    )
    Ok(result)
  }

  def move() = Action(parse.json) { request =>
    val jsonBody = request.body
    val param1 = (jsonBody \ "param1").as[Int]
    val param2 = (jsonBody \ "param2").as[Int]
    val param3 = (jsonBody \ "param3").as[Int]
    val param4 = (jsonBody \ "param4").as[Int]
    controller.move(Some(controller.field.playerstatus), param1 , param2, param3, param4)
    val playerStatusString = controller.field.playerstatus.toString
    val gameStatusString = controller.field.gamestatus.toString
    println(gameStatusString)
    val result = Json.obj(
      "value1" -> Json.toJson(playerStatusString),
      "value2" -> Json.toJson(gameStatusString)
    )
    Ok(result)
  }

  def interactive() = Action { request => 
    field = new Field
    controller = new Controller(field)
    Ok(views.html.interactive(controller))
  }

}
