import React from 'react';
import { useEffect, useState } from "react";
import { getTokenInternal, useAuthContext } from "./auth";
import {useNavigate} from 'react-router-dom';

export default function Watchlist(){
  const [decodedUser, setDecodedUser] = useState("");
  const { token } = useAuthContext();
  const [watchlists, setWatchlists] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  function parseJwt(token) {
    console.log(token, "token inside decoding")
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    const variable = JSON.parse(jsonPayload);
    console.log(variable, "---------------variable in decoder------------")
    setDecodedUser(variable.account.id);
  }

  useEffect(() => {
        if (token !== null) {
        parseJwt(token);
        }
      }, [token]);


  useEffect(() => {
      const watchlistUrl = `${process.env.REACT_APP_WATCHLISTS_API_HOST}/api/watchlists/${decodedUser}`;
      console.log("===========decodedUser fetch the GET request===================",decodedUser)
      console.log("==============token fetch the GET request====================",token)
      const fetchConfig = {
      method: "GET",
      headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  };
      fetch(watchlistUrl, fetchConfig)
          .then(response => response.json())
          .then(console.log("=================fetch to watchlist request send=================="))
          .then(data => {
                setWatchlists(data.watchlists);
                console.log("data",data)
                console.log("data.watchlists",data.watchlists)
          })
          .catch(e => console.log('error: ', e));
  }, [decodedUser, token, watchlists, submitted])

    // function getWatchlist{
    // // if (!decodedUser){navigate("/");}
    // const watchlistUrl = `${process.env.REACT_APP_WATCHLISTS_API_HOST}/api/watchlists/${decodedUser}`;
    // const fetchConfig = {
    //     method: "get",
    //     headers: {
    //     Authorization: `Bearer ${token}`,
    //     "Content-Type": "application/json",
    //   },
    //   credentials: "include",
    // };
    // const response = fetch(watchlistUrl, fetchConfig);
    // console.log("response",response)
    // if (response.ok){
    //     const data = response.json();
    //     setWatchlists(data.watchlists);
    // }else{
    // console.log("fetch error")
    // };
    // }
    // getWatchlist()




// const Watchlist = () => {
//     const [watchlists, setWatchlists] = useState([]);
//     const [submitted, setSubmitted] = useState(false);

//     // First argument: state variable
//     // Second argument: function
//     const user = {"id":1}

//     // useEffect(() => {
//     // async function getWatchlist(){
//     //     const token = await getTokenInternal();
//     //     if (!token){
//     //     console.log("token is null",token)
//     //     }else{
//     //     console.log("======token=======", token)
//     //     let decoded = parseJwt(token);
//     //     console.log("========decoded===========",decoded)
//     //     const watchlistURL = `${process.env.REACT_APP_WATCHLISTS_API_HOST}/api/watchlists/${decoded.account.id}}`
//     //     console.log("========watchlistURL===========",watchlistURL)
//     //     const fetchConfig = {
//     //         method: "GET",
//     //         headers:{
//     //             Authentication: `Bearer ${token}`,
//     //             "Content-Type": "application/json",
//     //         },
//     //     }
//     //     const response = await fetch(watchlistURL, fetchConfig)
//     //         if (response.ok){
//     //             const data = response.json();
//     //             setWatchlists(data.watchlists)
//     //         }else{
//     //             console.log("fetch error")
//     //         }};
//     //     }getWatchlist(),[watchlists, submitted]})
//     // //  catch (error) {console.error("Error", error)}





// //     useEffect(() => {
// //     async function checkToken(){
// //         if (!token){
// //         console.log("token is null",token)
// //         const token = await getTokenInternal();
// //         console.log("======token=======", token)
// //         let decoded = parseJwt(token);
// //         console.log("========decoded===========",decoded)
// //     //  catch (error) {console.error("Error", error)}
// //     }
// // }
// //     async function getWatchlist(){
// //         const watchlistURL = `${process.env.REACT_APP_WATCHLISTS_API_HOST}/api/watchlists/${token.account.id}`
// //         const fetchConfig = {
// //             method: "GET",
// //             headers:{
// //                 Authentication: `Bearer ${token}`,
// //                 "Content-Type": "application/json",
// //             },
// //         }
// //         const response = await fetch(watchlistURL, fetchConfig)
// //             if (response.ok){
// //                 const data = response.json();
// //                 setWatchlists(data.watchlists)
// //             }else{
// //                 console.log("fetch error")
// //             }
// //     }getWatchlist()
// // }, [watchlists, user.id, submitted])


const delWatchlist = async (watchlist) => {
    const token = await getTokenInternal();
    const delURL = `${process.env.REACT_APP_WATCHLISTS_API_HOST}/api/watchlists/${decodedUser}/${watchlist.id}`;
    const fetchConfig = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };
    const response = await fetch (delURL, fetchConfig);
    if (response.ok) {
        setWatchlists([...watchlist]);
        setSubmitted(true);
    }}



    return (
        <>
            <h1>Anime in Your Watch List</h1>
            <table className="table table-dark table-striped">
                <thead>
                    <tr>
                        <th>Anime Title</th>
                        <th>Date</th>
                            {/* <th>Picture</th> */}
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {watchlists.map(watchlist => {
                        return (
                            <tr key={watchlist.id}>
                                <td>{watchlist.title}</td>
                                <td>{watchlist.name}</td>
                                {/* <td><img src={watchlist.img_url} alt={watchlist.title} width="20%" height="20%" /></td> */}
                                <td><button className="btn btn-danger" onClick={() => delWatchlist(watchlist.id)}
                                >Remove</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}
