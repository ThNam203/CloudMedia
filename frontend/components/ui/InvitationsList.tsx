import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import ItemRequestUser from './ItemRequestUser';
import {getAllFrRequestOfUser} from '../../api/friend_api';
import {RootState} from '../../reducers/Store';
import {useSelector} from 'react-redux';
import {getInfoUser} from '../../api/userApi';
import {replyRequestFr} from '../../api/friend_api';
import {Toast} from './Toast';

const InvitationsList = () => {
  const token = useSelector((state: RootState) => state.token.key);
  const uid = useSelector((state: RootState) => state.uid.id);

  const [invitations, setInvitations] = useState<
    {id: string; name: string; avatar: any; connection: any}[]
  >([]);

  const deleteInvitation = (id: any) => {
    const newInvitations = invitations.filter(obj => obj.id !== id);
    setInvitations(newInvitations);
  };

  const replyRequest = (rep: any, requestId: any) => {
    replyRequestFr(rep, uid, requestId, token)
      .then((response: any) => {
        if (response.status === 204) {
          return response.data;
        } else {
          console.log(response.status);
          throw new Error(response.data.errorMessage);
        }
      })
      .then(() => {
        deleteInvitation(requestId);
      })
      .catch(error => {
        Toast(error.message);
      });
  };

  const handleAccept = async (requestId: any) => {
    replyRequest('Accept', requestId);
  };

  const handleDecline = async (requestId: any) => {
    replyRequest('Decline', requestId);
  };

  const getNameInfo = (id: any) => {
    return getInfoUser(id)
      .then((response: any) => {
        if (response.status === 200) {
          return response.data;
        } else {
          console.log(response.status);
          throw new Error(response.data.errorMessage);
        }
      })
      .then(data => {
        const info = {
          name: data.name,
          profileImagePath: data.profileImagePath,
        };
        return info;
      })
      .catch(error => {
        Toast(error.message);
      });
  };

  useEffect(() => {
    getAllFrRequestOfUser(uid, token)
      .then((response: any) => {
        if (response.status === 200) {
          return response.data;
        } else {
          console.log(response.status);
          throw new Error(response.data.errorMessage);
        }
      })
      .then(data => {
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
                profileImagePath: infoUser.profileImagePath,
                datebetween: diffInHours + 'h',
              };
            })
            .catch(error => {
              Toast(error.message);
            });
        });
        return Promise.all(promises);
      })
      .then((ArrayData: any) => {
        setInvitations(ArrayData);
      })
      .catch(error => {
        Toast(error.message);
      });
  }, [token, uid]);

  return (
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
      keyExtractor={(item, index) => 'key' + index}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default InvitationsList;
