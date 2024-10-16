

export const decodeToken=(token)=>{
    // Split the JWT token to extract the payload
    const tokenParts = token.split('.');
    const payload = tokenParts[1]; // the second part is the payload
    
    // Decode the payload
    const decodedPayload = base64Decode(payload);
    
    // Parse the decoded JSON payload
    const payloadObject = JSON.parse(decodedPayload);

    // Extract the key from the payload object
    const key = Object.keys(payloadObject)[0];
    // Extract 67187 and 27126 from the key
    // Log the extracted values
    
    // obj['token']=token;
    // if (matches && matches.length >= 3) {
    //   const customer_id = matches[0];
    //   const contact_id = matches[2];
    //   obj['customer_id']=Number(customer_id);
    //   obj['contact_id']=Number(contact_id);
    // }
    return payloadObject 
  }

function base64Decode(tokenPart) {
    return decodeURIComponent(
      atob(tokenPart)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  }