package angular.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import angular.dao.ItemDao;
import angular.entity.Item;

@Service
public class ItemService
{
	@Autowired
	private ItemDao itemDAO;

	@Transactional
	public List<Item> getItems() 
	{
		return itemDAO.getItems();
	}

	@Transactional
	public List<Item> getItemsFromList(int id)
	{
		return itemDAO.getItemsFromList(id);
	}

	@Transactional
	public void addItem(Item item)
	{
		itemDAO.addItem(item);		
	}

	@Transactional
	public void deleteItem(Item item) 
	{
		itemDAO.deleteItem(item);
	}
}
