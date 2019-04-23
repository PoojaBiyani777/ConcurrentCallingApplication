package com.zemoso.concurrentcallingservermodule.repository;
import com.zemoso.concurrentcallingservermodule.model.CallDetailsModel;
import com.zemoso.concurrentcallingservermodule.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CallDetailsRepository extends CrudRepository<CallDetailsModel, Long>
{
    public void deleteCallDetailsById(Long id);
    public List<CallDetailsModel> findAllByPhoneNumber(String phoneNumber);
}
