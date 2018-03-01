package angular.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import angular.entity.Item;

@Repository
public class ItemDao 
{
	public List<Item> getItems()
	{
		SessionFactory factory =new Configuration()
				.configure("hibernate.cfg.xml")
				.addAnnotatedClass(Item.class)
				.buildSessionFactory();

		Session session = factory.getCurrentSession();
		
		session.beginTransaction();
		Query<Item> query = session.createQuery("from Item", Item.class);
		
		List<Item> result = query.getResultList();
		session.getTransaction().commit();
		return result;
	}

	public List<Item> getItemsFromList(int listId) 
	{
		SessionFactory factory =new Configuration()
				.configure("hibernate.cfg.xml")
				.addAnnotatedClass(Item.class)
				.buildSessionFactory();

		Session session = factory.getCurrentSession();		
		
		session.beginTransaction();
		Query<Item> query = session.createQuery("from Item where list=:listId", Item.class);
		query.setParameter("listId", listId);
		
		List<Item> result = query.getResultList();
		session.getTransaction().commit();
		return result;
	}

	public void addItem(Item item)
	{
		SessionFactory factory =new Configuration()
				.configure("hibernate.cfg.xml")
				.addAnnotatedClass(Item.class)
				.buildSessionFactory();

		Session session = factory.getCurrentSession();		
		
		session.beginTransaction();
		session.save(item);
		session.getTransaction().commit();
	}

	public void deleteItem(Item item)
	{
		SessionFactory factory =new Configuration()
				.configure("hibernate.cfg.xml")
				.addAnnotatedClass(Item.class)
				.buildSessionFactory();

		Session session = factory.getCurrentSession();		
		
		session.beginTransaction();
		session.delete(item);
		session.getTransaction().commit();
		
	}
	
	
}
