import React, { Component } from 'react';
import { dummyUsers } from "./Users";

class MyNetwork extends Component {
    render() {
        return (
            <div className="users">
                <div className="users-container">
                    <ul>
                        {dummyUsers.map(user =>
                            <li key={user.id} className="user">
                                <picture className="user-picture">
                                    <img src={user.photoUrl} alt={`${user.name}`} />
                                </picture>
                                <div className="user-info-container">
                                    <div className="user-info">
                                        <h4>{user.name}</h4>
                                        <p>{user.info}</p>
                                    </div>
                                    <div className="user-action">
                                        <button >Message</button>
                                    </div>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        )
    }
}
export default MyNetwork;