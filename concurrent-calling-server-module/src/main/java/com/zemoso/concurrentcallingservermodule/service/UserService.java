package com.zemoso.concurrentcallingservermodule.service;

import com.zemoso.concurrentcallingservermodule.model.User;
import com.zemoso.concurrentcallingservermodule.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService
{
    @Autowired
    public UserRepository userRepository;

    public List<User> getAllUsers()
    {
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(users :: add);
        return users;
    }

    public Optional<User> getUserById(Long id)
    {
        return userRepository.findById(id);
    }

    public void addUser(User user)
    {
        userRepository.save(user);
    }

    public void updateUserDetails(Long id, String userName1, String firstName1, String lastName1, String password1)
    {
        Optional<User> userOptional = userRepository.findById(id);
        User user = userOptional.get();
        if(userOptional.isPresent())
        {
            String userName = user.getUserName();
            String firstName = user.getFirstName();
            String lastName = user.getLastName();
            String password = user.getPassword();
            Blob displayPicture = user.getDisplayPicture();

            user.setUserName(userName1);
            user.setFirstName(firstName1);
            user.setLastName(lastName1);
            user.setPassword(password1);
          //  user.setDisplayPicture(displayPicture1);

            userRepository.save(user);
        }
        else
        {

        }
    }

}
