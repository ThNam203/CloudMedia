import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import ItemRequestUser from './ItemRequestUser';
import {getAllFrRequestOfUser} from '../../api/friend_api';
import {RootState} from '../../reducers/Store';
import {useSelector} from 'react-redux';
import {user_info} from '../../api/user_api';
import {replyRequestFr} from '../../api/friend_api';

const InvitationsList = () => {
  const token = useSelector((state: RootState) => state.token.key);
  const uid = useSelector((state: RootState) => state.uid.id);

  const [invitations, setInvitation] = useState<
    {id: string; name: string; avatar: any; connection: any}[]
  >([]);

  //delete an invitation from the state array.
  const deleteInvitation = (id: any) => {
    const newInvitation = invitations.filter(obj => obj.id !== id);
    setInvitation(newInvitation);
  };

  //reply to a friend request with either 'Accept' or 'Decline'.
  const replyREquest = (rep: any, requestId: any) => {
    replyRequestFr(rep, uid, requestId, token)
      .then((response: any) => {
        if (response.status === 204) {
          return response.data;
        } else {
          console.log(response.response.status);
          throw new Error(response.response.data.errorMessage);
        }
      })
      .then(() => {
        // Call the deleteInvitation function to remove the invitation from the state.
        deleteInvitation(requestId);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleAccept = async (requestId: any) => {
    replyREquest('Accept', requestId);
  };

  const handleDecline = async (requestId: any) => {
    replyREquest('Decline', requestId);
  };

  //get the name and avatar information for a user given their id.
  const getNameInfo = (id: any) => {
    return user_info(id)
      .then((response: any) => {
        if (response.status === 200) {
          return response.data;
        } else {
          console.log(response.response.status);
          throw new Error(response.response.data.errorMessage);
        }
      })
      .then(data => {
        const info = {
          name: data.name,
          avatar: {uri: data.profileImagePath},
        };
        return info;
      })
      .catch(error => {
        console.error(error);
      });
  };

  // Use the useEffect hook to fetch the friend requests for the current user and update the invitations state variable.
  useEffect(() => {
    getAllFrRequestOfUser(uid, token)
      .then((response: any) => {
        if (response.status === 200) {
          return response.data;
        } else {
          console.log(response.response.status);
          throw new Error(response.response.data.errorMessage);
        }
      })
      .then(data => {
        // {
        //   id: '1',
        //   name: 'John Doe',
        //   datebetween: '1d',
        //   avatar: require('../../assets/images/Spiderman.jpg'),
        // },

        // For each friend request, call getNameInfo to get the sender's name and avatar information
        const promises = data.map((item: any) => {
          const dateNow = new Date();
          const date = new Date(item.createdAt);
          const diffInMilliseconds = dateNow.getTime() - date.getTime();
          const diffInHours = Math.round(diffInMilliseconds / 3600000);

          return getNameInfo(item.senderId)
            .then((infoUser: any) => {
              return {
                id: item._id,
                name: infoUser.name,
                avatar: infoUser.avatar,
                datebetween: diffInHours,
              };
            })
            .catch(error => {
              console.error(error);
            });
        });
        return Promise.all(promises);
      })
      .then((ArrayData: any) => {
        setInvitation(ArrayData);
      })
      .catch(error => {
        console.error(error);
      });
  }, [token, uid]);

  return invitations.length > 0 ? (
    <FlatList
      data={invitations}
      renderItem={({item}) => (
        <ItemRequestUser
          item={item}
          nameRequest="Accept"
          nameRequest2="Decline"
          pressLeft={() => {
            handleAccept(item.id);
          }}
          pressRight={() => {
            handleDecline(item.id);
          }}
        />
      )}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
    />
  ) : null;
};

export default InvitationsList;
