#Starter Kit
**minimal** code base for creating apps to do **locally**.

## Stack

- 🦙 Inference: [React](https://legacy.reactjs.org/docs/getting-started.html)
- 💻 DB: [MongoDB](https://www.mongodb.com/cloud/atlas/)
- 🖼️ App logic: [NEST](https://docs.nestjs.com/)

## Change Configurations
go to /backend/src/app.module.ts
add your Databases mongoDB url
should be ///mongodb+srv
Start the  database (you need mongodb). See [here](https://www.mongodb.com/cloud/atlas/efficiency?utm_source=google&utm_campaign=search_gs_pl_evergreen_atlas_general-phrase_prosp-brand_gic-null_ww-multi_ps-all_desktop_eng_lead&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=p&utm_ad_campaign_id=11295578158&adgroup=116363205048&cq_cmp=11295578158&gad_source=1&gclid=CjwKCAiAiP2tBhBXEiwACslfngFnaFlpMoVQscrI77uHbQQ5zSei0u0GdQmC0EF-Gfk_Zi0X2UgFxxoCa_0QAvD_BwE) for other options information: 
mongoDB
## How to get started

```bash
git clone https://github.com/
```

2. Install backend dependencies:

```bash
cd backend/
npm install
npm start run dev:start
```

3. Install frontend dependencies:

```bash
cd frontend
npm install
npm start
```
## Additional Use Cases
In the frontend, I adopted a Feature Sliced Design, organizing components based on features rather than traditional type-based directories. This approach enhances modularity and scalability. Each feature slice contains its components, styles, and logic, promoting a clear separation of concerns and facilitating future expansions.

## Discussion and Contribution

The project prioritizes security through robust authentication and authorization mechanisms. Utilizing JSON Web Tokens (JWT) ensures secure user authentication and authorization on the server. The implementation includes features such as access and refresh tokens, preventing unauthorized access and enhancing overall system security. Passwords are securely hashed using the Argon2 algorithm, reinforcing the protection of sensitive user data. By following industry best practices, the project minimizes security risks and lays a solid foundation for future enhancements.

Feel free to modify these descriptions based on the specific details and nuances of your project. If you have more specific questions or need assistance with other aspects of your project description, feel free to ask!

## MIT License

Copyright (c) 2024 Zvezdomir