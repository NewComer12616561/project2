/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol: 'https',
                hostname: '*.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'khanh-project2b.s3.amazonaws.com',
                
            }
        ]
    }
};

export default nextConfig;
