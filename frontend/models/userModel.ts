interface UserModel {
  _id: string;
  name: string;
  email: string;
  userRole: string;
  createdDate: Date;
  profileImagePath?: string;
  location?: string;
  company?: {
    logoUrl: string;
    name: string;
    linkToWebsite: string;
  };
  connections?: Array<string>;
  chatRooms?: Array<string>;
}

export default UserModel;
