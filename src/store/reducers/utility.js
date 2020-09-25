export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  }
}

export const formatBasicAuth = (usrname, pswd) => {
  let basicAuthCredential = usrname + ":" + pswd
  let bace64 = btoa(basicAuthCredential)
  return "Basic " + bace64
}
