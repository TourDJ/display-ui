
export default {
    singular: true,

    plugins: [
        ['umi-plugin-react', {
            antd: true, 
            dva: true,
        }],    
    ],

    routes: [
        {
            path: '/',
            component: '../layout',
            routes: [
                {
                    path: '/',
                    component: 'helloworld',
                },            
                {
                    path: '/helloworld',
                    component: 'helloworld',
                },            
                {
                    path: '/dashboard',
                    routes: [
                        {path: '/dashboard/analysis', component: 'dashboard/analysis'},    
                        {path: '/dashboard/monitor', component: 'dashboard/monitor'},    
                        {path: '/dashboard/workplace', component: 'dashboard/workplace'}    
                    ]
                },
                {
                    path: '/gallery',
                    component: './gallery.js'
                },
            ],
        }
    ],
};
