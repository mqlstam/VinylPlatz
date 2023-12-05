// libs/backend/features/user/user.repository.ts

class UserRepository {
    private users = [];
  
    async findOne(condition: any) {
      return this.users.find(user => user.email === condition.email);
    }
  
    async save(newUser: any) {
      this.users.push(newUser);
      return newUser;
    }
  }
  
  export default UserRepository;
  