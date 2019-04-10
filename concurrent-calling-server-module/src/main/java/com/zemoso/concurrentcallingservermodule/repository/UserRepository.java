package com.zemoso.concurrentcallingservermodule.repository;
import com.zemoso.concurrentcallingservermodule.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long>
{

}
