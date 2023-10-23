package livechat.livechat.controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import livechat.livechat.entities.Message;

@Controller
public class AppController {

    @RequestMapping("/")
   public ModelAndView index(){
   return new ModelAndView("index");
}

@MessageMapping("/chatmessages")
@SendTo("/chat")
public Message sendMessage(Message message){
    return message;
}
   
}
