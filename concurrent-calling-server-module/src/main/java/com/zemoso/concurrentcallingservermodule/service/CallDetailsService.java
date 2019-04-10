package com.zemoso.concurrentcallingservermodule.service;
import com.zemoso.concurrentcallingservermodule.model.CallDetailsModel;
import com.zemoso.concurrentcallingservermodule.model.User;
import com.zemoso.concurrentcallingservermodule.repository.CallDetailsRepository;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@Service
public class CallDetailsService
{
    @Autowired
    public CallDetailsRepository callDetailsRepository;
    private CallDetailsModel savedCallDetails;
    
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
/*
    public void updateStatus(Long id, String statusChanged)
    {
        Optional<CallDetailsModel> callDetailsModelOptional = callDetailsRepository.findById(id);
        CallDetailsModel callDetails = callDetailsModelOptional.get();
        if(callDetailsModelOptional.isPresent())
        {
            User user = callDetails.getUser();
            int checked = callDetails.isChecked();
            String contactName = callDetails.getContactName();
            String phoneNumber = callDetails.getPhoneNumber();
            String status = callDetails.getStatus();
            String dueDate = callDetails.getDueDate();
            String duration = callDetails.getDuration();
            String notes = callDetails.getNotes();
            LocalDateTime createdDate = callDetails.getCreatedDate();

            callDetails.setStatus(statusChanged);
            callDetailsRepository.save(callDetails);
        }
        else
        {
          //  logger.info("No Call Details with the given id ");
        }
    }
    */

    public void updateStatusAndNotes(Long id,String statusChanged, String notesChanged)
    {
        Optional<CallDetailsModel> callDetailsModelOptional = callDetailsRepository.findById(id);
        CallDetailsModel callDetails = callDetailsModelOptional.get();
        if(callDetailsModelOptional.isPresent())
        {
            User user = callDetails.getUser();
            int checked = callDetails.isChecked();
            String contactName = callDetails.getContactName();
            String phoneNumber = callDetails.getPhoneNumber();
            String status = callDetails.getStatus();
            String dueDate = callDetails.getDueDate();
            String duration = callDetails.getDuration();
            String notes = callDetails.getNotes();
            LocalDateTime createdDate = callDetails.getCreatedDate();

                callDetails.setNotes(notesChanged);
                callDetails.setStatus(statusChanged);
            callDetailsRepository.save(callDetails);
        }
        else
        {
            //  logger.info("No Call Details with the given id ");
        }
    }

    public void deleteCallDetailsById(Long id)
    {
        callDetailsRepository.deleteById(id);
    }

}


