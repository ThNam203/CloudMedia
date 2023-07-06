import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import ItemRequestUser from './ItemRequestUser';
import {getAllFrRequestOfUser} from '../../api/friend_api';
import {RootState} from '../../reducers/Store';
import {useDispatch, useSelector} from 'react-redux';
import {getInfoUser} from '../../api/userApi';
import {replyRequestFr} from '../../api/friend_api';
import {Toast} from './Toast';
import {addFriend} from '../../reducers/UserReducer';
import {Text} from 'react-native-animatable';

const InvitationsList = (props: any) => {
  const {navigation} = props;
  const token = useSelector((state: RootState) => state.token.key);
  const uid = useSelector((state: RootState) => state.uid.id);

  const dispatch = useDispatch();

  const [invitations, setInvitations] = useState<
    {idRq: string; _id: string; name: string; avatar: any; connection: any}[]
  >([]);

  const deleteInvitation = (id: any) => {
    const newInvitations = invitations.filter(obj => obj.idRq !== id);
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

  const handleAccept = async (requestId: any, senderId: any) => {
    replyRequest('Accept', requestId);
    dispatch(addFriend(senderId));
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
                idRq: item._id,
                _id: item.senderId,
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

  if (invitations.length === 0) {
    return (
      <View>
        <Text style={{fontSize: 25, alignSelf: 'center', color: 'gray'}}>
          No invitations
        </Text>
      </View>
    );
  } else {
    return (
      <FlatList
        data={invitations}
        renderItem={({item}) => (
          <ItemRequestUser
            item={item}
            navigation={navigation}
            nameRequest="Accept"
            nameRequest2="Decline"
            pressLeft={() => {
              handleAccept(item.idRq, item._id);
            }}
            pressRight={() => {
              handleDecline(item.idRq);
            }}
          />
        )}
        keyExtractor={(item, index) => 'key' + index}
        showsVerticalScrollIndicator={false}
      />
    );
  }
};

export default InvitationsList;
