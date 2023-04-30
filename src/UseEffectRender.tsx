import React from "react";
import axios from "axios";

export const UseEffectRender = () => {
  const [user, setUser] = React.useState<User>();
  const fetchJson = async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users/1");
    return res.data as User;
  };
  React.useEffect(() => {
    const fetchUser = async () => {
      fetchJson().then((user) => {
        setUser(user);
        console.log(user);
      });
    };
    fetchUser();
  }, []);

  return <div>{user ? <p>I am {user.username}</p> : <p>Loading...</p>}</div>;
};

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};
