package angular.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import angular.entity.Item;
import angular.services.ItemService;

@RestController
@RequestMapping(value="items")
public class ItemController 
{
	@Autowired
	private ItemService itemService;
	
	@GetMapping
	public List<Item> getItems()
	{
		return itemService.getItems();
	}
	
	@GetMapping("{listId}")
	public List<Item> getItemsFromList(@PathVariable int listId)
	{	
		return itemService.getItemsFromList(listId);
	}
	
	@PostMapping
	public void addItem(@RequestBody Item item)
	{
		itemService.addItem(item);
	}
	
	@DeleteMapping
	public void deletItem(@RequestBody Item item)
	{
		itemService.deleteItem(item);
	}
}
