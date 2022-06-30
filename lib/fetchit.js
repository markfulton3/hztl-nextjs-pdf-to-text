import useSWR from 'swr'; 

const fetchit = async (address, doc) => {

    console.log("Inside fetchit..");

    const msg = "";
    let promise = await fetch(address, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: doc
      });

    console.log(promise);


};

export default fetchit;