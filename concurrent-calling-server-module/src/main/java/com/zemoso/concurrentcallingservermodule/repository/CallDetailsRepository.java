package com.zemoso.concurrentcallingservermodule.repository;
import com.zemoso.concurrentcallingservermodule.model.CallDetailsModel;
import org.springframework.data.repository.CrudRepository;

public interface CallDetailsRepository extends CrudRepository<CallDetailsModel, Long>
{
    public void deleteCallDetailsById(Long id);
}
