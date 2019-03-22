package com.zemoso.concurrentcallingservermodule.service;
import com.zemoso.concurrentcallingservermodule.model.CallDetailsModel;
import com.zemoso.concurrentcallingservermodule.repository.CallDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class CallDetailsService
{
    @Autowired
    public CallDetailsRepository callDetailsRepository;

    public List<CallDetailsModel> getAllCallDetails()
    {
        List<CallDetailsModel> callDetails = new ArrayList<>();
        callDetailsRepository.findAll().forEach(callDetails :: add);
        return callDetails;
    }

    public Optional<CallDetailsModel> getCallDetailsById(Long id)
    {
        return callDetailsRepository.findById(id);
    }

    public void addCallDetails(CallDetailsModel callDetails)
    {
        callDetailsRepository.save(callDetails);
    }

    public void updateCallDetailsById(Long id, CallDetailsModel callDetails )
    {
        callDetailsRepository.save(callDetails);
    }

    public void deleteCallDetailsById(Long id)
    {
        callDetailsRepository.deleteById(id);
    }

}


