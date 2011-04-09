package models;

import java.util.Date;

import javax.persistence.Entity;

import play.data.validation.Required;
import play.db.jpa.Model;

@Entity
public class Item extends Model {

	@Required
	public String name;
	public Boolean done = false;
	public Date date;
	
	public Item(String name) {
		this.name = name;
		this.date = new Date();
	}
	
}
