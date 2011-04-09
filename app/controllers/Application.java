package controllers;

import play.*;
import play.data.validation.Required;
import play.data.validation.Valid;
import play.mvc.*;

import java.util.*;

import models.*;

public class Application extends Controller {

    public static void index() {
        List<Item> listDone = Item.find("done = ? order by date desc", Boolean.TRUE).fetch();
        List<Item> listNotDone = Item.find("done = ? order by date desc", Boolean.FALSE).fetch();
        render(listDone, listNotDone);
    }
    
    public static void create(@Required String name) {
        if(validation.hasErrors()) {
            flash.error("Oops, please give a name to your new item");
            index();
        }
        Item item = new Item(name);
        item.save();
        index();
    }

    public static void edit(@Valid Item item, String what) {
    	if ("Delete".equals(what)) {
    		item.delete();
    	} else {
    		if(validation.hasErrors()) {
                flash.error("Oops, cannot save an empty item");
                index();
            }
    		item.save();
    	}
    	index();
    }
    
}