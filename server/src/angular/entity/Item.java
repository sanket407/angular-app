package angular.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="items")
public class Item {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="id")
	private int id;
	
	@Column(name="name")
	private String name;
	
	@Column(name="list")
	private int list;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getList() {
		return list;
	}

	public void setList(int list) {
		this.list = list;
	}
	
	public Item() {
		
	}
	
	public Item(String name, int list) {
		
		this.name = name;
		this.list = list;
	}

	@Override
	public String toString() {
		return "Item [id=" + id + ", name=" + name + ", list=" + list + "]";
	}
	
	
}
