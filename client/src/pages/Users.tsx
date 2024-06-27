import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAxiosPrivate } from "../hooks";
import UserList from "../layouts/UserList";
import { User } from "../types/User";

const Users = () => {
    const [users, setUsers] = useState<User[]>();
    const axiosPrivate = useAxiosPrivate();
    const location = useLocation();
    const navigate = useNavigate();
    const effectRan = useRef(false);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        if (effectRan.current === true) {
            axiosPrivate
                .get("/users/getAll", {
                    signal: controller.signal,
                })
                .then((response) => {
                    isMounted && setUsers(response.data);
                })
                .catch((error) => {
                    console.error(error);
                    navigate("/login", {
                        state: { from: location },
                        replace: true,
                    });
                });
        }

        return () => {
            isMounted = false;
            controller.abort();
            effectRan.current = true;
        };
    }, []);

    return <>{users && <UserList users={users} />}</>;
};

export default Users;
