import { useState, useEffect } from "react";

import { FaEnvelopeOpen, FaUser, FaMap, FaPhone, FaLock, FaCalendarTimes } from "react-icons/fa";

import { useGetUsersQuery } from "./services/users";

const App = () => {
  const [person, setPerson] = useState(null);
  const [value, setValue] = useState("Random Person");
  const [title, setTitle] = useState("name");

  // Using a query hook automatically fetches data and returns query values
  const { data, isLoading, refetch } = useGetUsersQuery();

  useEffect(() => {
    if (data) {
      const randomPerson = data.results[0];
      console.log(randomPerson);

      const { phone, email } = randomPerson;
      const { large: image } = randomPerson.picture;
      const { password } = randomPerson.login;
      const { first, last } = randomPerson.name;
      const {
        dob: { age },
      } = randomPerson;
      const {
        street: { number, name },
      } = randomPerson.location;

      const newPerson = {
        image,
        phone,
        email,
        password,
        age,
        street: `${number} ${name}`,
        name: `${first} ${last}`,
      };

      setPerson(newPerson);
      setTitle("name");
      setValue(newPerson.name);
    }
  }, [data]);

  const handleMouseOver = e => {
    if (e.target.classList.contains("icon")) {
      const newValue = e.target.dataset.label;
      setTitle(newValue);
      setValue(person[newValue]);
    }
  };

  return (
    <main>
      <div className="block bcg-black" />
      <div className="block">
        <div className="container">
          <img src={person?.image || "/profile.png"} alt="random user" className="user-img" />
          <p className="user-title">{title}</p>
          <p className="user-value">{value}</p>

          <div className="values-list">
            <button className="icon" data-label="name" onMouseOver={handleMouseOver}>
              <FaUser />
            </button>
            <button className="icon" data-label="email" onMouseOver={handleMouseOver}>
              <FaEnvelopeOpen />
            </button>
            <button className="icon" data-label="age" onMouseOver={handleMouseOver}>
              <FaCalendarTimes />
            </button>
            <button className="icon" data-label="street" onMouseOver={handleMouseOver}>
              <FaMap />
            </button>
            <button className="icon" data-label="phone" onMouseOver={handleMouseOver}>
              <FaPhone />
            </button>
            <button className="icon" data-label="password" onMouseOver={handleMouseOver}>
              <FaLock />
            </button>
          </div>

          <button className="btn" onClick={() => refetch()}>
            {isLoading ? "loading..." : "random user"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default App;
