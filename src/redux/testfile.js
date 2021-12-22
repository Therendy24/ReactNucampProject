export const postFeedback = feedback => () => {
    
    // export const postFeedback = feedback => () => dispatch => {
    // firstName, lastName, phoneNum, email, agree, contactType, feedback, id
    // const newFeedback = {
    //     firstName: firstName,
    //     lastName: lastName,
    //     phoneNum: phoneNum,
    //     email: email,
    //     agree: agree,
    //     contactType: contactType,
    //     feedback: feedback,
    //     id: id
    // };
    
    return fetch(baseUrl + 'feedback', {
            method: "POST",
            body: JSON.stringify(feedback),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => { throw error; }
        )
        .then(response => response.json())
        .then(console.log('Feedback: ' + JSON.stringify(feedback)))
        .then(alert('Thank you for your feedback!\nYou Submitted: ' + JSON.stringify(feedback)))
        // .then(response => alert('Thank you for your feedback\nError: ' + response.json())
        .catch(error => {
            console.log('Feedback: ', error.message);
            alert('Your feedback could not be posted\nError: ' + error.message);
        });
};