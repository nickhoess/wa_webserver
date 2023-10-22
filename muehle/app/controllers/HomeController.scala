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


/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

  val field = new Field
  val controller = new Controller(field)
  val tui = new TUI(controller)
  
  val boa = controller.field.mesh()
  /**
   * Create an Action to render an HTML page.
   *
   * The configuration in the `routes` file means that this method
   * will be called when the application receives a `GET` request with
   * a path of `/`.
   */
  def index() = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.index(boa))
  }

  def test() = Action { implicit request: Request[AnyContent] =>   
    controller.put(Some(controller.field.playerstatus), 1 , 1)
    val message = controller.field.mesh()
    Ok(views.html.consoleOutput(message))
  }


  def printToConsole() = Action {
    controller.put(Some(controller.field.playerstatus), 1 , 2)
    val message = controller.field.mesh()
    Ok(views.html.consoleOutput(message))
  }

}
