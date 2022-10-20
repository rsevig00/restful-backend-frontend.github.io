package com.microservices.microservice.model.entitys;

import javax.persistence.Column;  
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;  
import javax.persistence.Table;  

@Entity
@Table(name="users")
public class User 
{  
	
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
@Column(name="username")
private String username;  
@Column(name="email")
private String email;
@Column(name="password")
private String password;

public User() {}

public User (String name, String email, String password) {
	this.username = name;
	this.email = email;
	this.password = password;
}

public Long getId()   
{  
return id;  
}  
public void setId(Long id)   
{  
this.id = id;  
}  
public String getName()   
{  
return username;  
}  
public void setName(String name)   
{  
this.username = name;  
}  

public String getEmail()   
{  
return email;  
}  
public void setEmail(String email)   
{  
this.email = email;  
}

public String getPassword() {
    return password;
}

public void setPassword(String password) {
    this.password = password;
}  
} 