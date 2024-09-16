import React from 'react';
import { Container, Box, Typography, Grid, Card, CardContent, Avatar } from '@mui/material';
import { FaUsers, FaChalkboardTeacher, FaUserTie, FaCog, FaLaptopCode } from 'react-icons/fa';
import { motion } from 'framer-motion'; // مكتبة لتأثيرات الحركة
import { useParams } from 'react-router-dom';

function ProjectDetails() {
  // بيانات المشاريع العشرة
  const projectsData = {
    1: {
      name: 'Innovative Agriculture Project',
      description: 'A groundbreaking project aimed at revolutionizing agricultural practices.',
      headerImage: 'https://cdn.prod.website-files.com/6077b42e4e8d6b13a8ea682a/63d34ad8e4669603b27c3267_0*W22x9Y1gFnjljnnO.jpeg',
      team: [
        { name: 'John Doe', title: 'Lead Developer', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFk4A8268xGsLhlVTF55Pr48mSCAfDkda8Ig&s', bgColor: '#FFEB3B' },
        { name: 'Jane Doe', title: 'Project Manager', img: 'https://mostaql.hsoubcdn.com/uploads/portfolios/1322391/625977c76ba6d/78CF1E6E-BC4B-4D08-B86C-7CA397DCF044.jpeg', bgColor: '#4CAF50' },
        { name: 'Alex Smith', title: 'UX Designer', img: 'https://e7.pngegg.com/pngimages/1/723/png-clipart-graphy-business-portrait-business-people-public-relations.png', bgColor: '#2196F3' }
      ],
      supervisor: { name: 'Dr. Emma Brown', description: 'Dr. Emma Brown is an experienced project supervisor with a background in sustainable agriculture...', img: 'https://7znn.net/wp-content/uploads/2019/08/3052-11.jpg' },
      customer: { name: 'Mr. David Green', description: 'Mr. David Green, an entrepreneur, has been a strong advocate of sustainable agricultural practices...', img: 'https://7znn.net/wp-content/uploads/2019/08/3052-11.jpg' },
      features: [
        { feature: 'Automated Irrigation', description: 'Intelligent irrigation system that conserves water and maximizes crop yield.', iconColor: '#F44336' },
        { feature: 'Soil Health Monitoring', description: 'Real-time soil analysis to maintain optimal growing conditions.', iconColor: '#FFEB3B' },
        { feature: 'Sustainable Practices', description: 'Utilizing eco-friendly farming techniques to promote sustainability.', iconColor: '#4CAF50' }
      ],
      technologies: [
        { tech: 'IoT Sensors', description: 'Advanced sensors to monitor soil moisture, temperature, and weather conditions.', iconColor: '#2196F3' },
        { tech: 'Machine Learning', description: 'Predictive analytics for crop management and yield optimization.', iconColor: '#673AB7' },
        { tech: 'Blockchain', description: 'Ensuring transparent and secure transactions in the agricultural supply chain.', iconColor: '#FF9800' }
      ]
    },
    2: {
      name: 'Smart Irrigation System',
      description: 'An innovative project to automate irrigation using sensors and AI.',
      headerImage: 'https://via.placeholder.com/1500x300?text=Smart+Irrigation+System',
      team: [
        { name: 'Michael Johnson', title: 'AI Specialist', img: 'https://via.placeholder.com/150?text=Michael' },
        { name: 'Sarah Connor', title: 'Hardware Engineer', img: 'https://via.placeholder.com/150?text=Sarah' },
        { name: 'Emily Davis', title: 'Software Developer', img: 'https://via.placeholder.com/150?text=Emily' }
      ],
      supervisor: { name: 'Dr. Alice Morgan', description: 'An expert in AI and automation in agriculture.', img: 'https://via.placeholder.com/150?text=Alice' },
      customer: { name: 'GreenTech', description: 'A leading company in agricultural technologies.', img: 'https://via.placeholder.com/150?text=GreenTech' },
      features: [
        { feature: 'AI-Powered Analysis', description: 'Real-time data analysis for optimized irrigation.', iconColor: '#009688' },
        { feature: 'Weather Prediction', description: 'Integration with weather forecasts to adjust irrigation schedules.', iconColor: '#03A9F4' },
        { feature: 'Energy Efficiency', description: 'Low power consumption using solar panels.', iconColor: '#FFC107' }
      ],
      technologies: [
        { tech: 'IoT Devices', description: 'Sensors to monitor soil moisture and weather conditions.', iconColor: '#8BC34A' },
        { tech: 'Neural Networks', description: 'Advanced AI models for predicting irrigation needs.', iconColor: '#9C27B0' },
        { tech: 'Cloud Computing', description: 'Data storage and analysis on the cloud.', iconColor: '#FF5722' }
      ]
    },
    3: {
      name: 'Urban Farming Initiative',
      description: 'An urban farming project to bring fresh produce to city dwellers.',
      headerImage: 'https://via.placeholder.com/1500x300?text=Urban+Farming+Initiative',
      team: [
        { name: 'Anna White', title: 'Project Coordinator', img: 'https://via.placeholder.com/150?text=Anna' },
        { name: 'James Brown', title: 'Agronomist', img: 'https://via.placeholder.com/150?text=James' },
        { name: 'Lucas Green', title: 'Urban Planner', img: 'https://via.placeholder.com/150?text=Lucas' }
      ],
      supervisor: { name: 'Dr. Samantha Gray', description: 'Expert in urban farming and sustainable agriculture.', img: 'https://via.placeholder.com/150?text=Samantha' },
      customer: { name: 'City Agriculture Board', description: 'A board responsible for promoting urban agriculture.', img: 'https://via.placeholder.com/150?text=City+Agriculture+Board' },
      features: [
        { feature: 'Hydroponics', description: 'Soilless farming to grow vegetables in urban areas.', iconColor: '#4CAF50' },
        { feature: 'Rooftop Gardens', description: 'Utilizing rooftops to grow fresh produce.', iconColor: '#FF9800' },
        { feature: 'Community Engagement', description: 'Involving local communities in farming activities.', iconColor: '#FF5722' }
      ],
      technologies: [
        { tech: 'Hydroponic Systems', description: 'Efficient water usage systems for urban farming.', iconColor: '#2196F3' },
        { tech: 'GIS Mapping', description: 'Mapping urban areas for suitable farming spots.', iconColor: '#673AB7' },
        { tech: 'Community Apps', description: 'Mobile apps for community engagement and awareness.', iconColor: '#FF9800' }
      ]
    },
    4: {
      name: 'Solar-Powered Greenhouse',
      description: 'A project focusing on sustainable greenhouses using solar energy.',
      headerImage: 'https://via.placeholder.com/1500x300?text=Solar+Powered+Greenhouse',
      team: [
        { name: 'David Clark', title: 'Energy Specialist', img: 'https://via.placeholder.com/150?text=David' },
        { name: 'Emma Davis', title: 'Greenhouse Designer', img: 'https://via.placeholder.com/150?text=Emma' },
        { name: 'Sophia Martinez', title: 'Agricultural Engineer', img: 'https://via.placeholder.com/150?text=Sophia' }
      ],
      supervisor: { name: 'Prof. Olivia Williams', description: 'A professor specializing in sustainable energy solutions for agriculture.', img: 'https://via.placeholder.com/150?text=Olivia' },
      customer: { name: 'EcoGreen Farms', description: 'A farm dedicated to sustainable agriculture.', img: 'https://via.placeholder.com/150?text=EcoGreen' },
      features: [
        { feature: 'Solar Panels', description: 'Using solar energy to power the greenhouse.', iconColor: '#FFC107' },
        { feature: 'Climate Control', description: 'Automated climate control for optimal plant growth.', iconColor: '#FF5722' },
        { feature: 'Water Recycling', description: 'Recycling water for irrigation.', iconColor: '#4CAF50' }
      ],
      technologies: [
        { tech: 'Solar Panels', description: 'Harvesting solar energy for greenhouse operations.', iconColor: '#FF9800' },
        { tech: 'Automated Climate Control', description: 'Maintaining optimal conditions inside the greenhouse.', iconColor: '#2196F3' },
        { tech: 'Water Recycling Systems', description: 'Efficient use of water through recycling.', iconColor: '#8BC34A' }
      ]
    },
    5: {
      name: 'Precision Agriculture',
      description: 'Using advanced technologies for efficient farming.',
      headerImage: 'https://via.placeholder.com/1500x300?text=Precision+Agriculture',
      team: [
        { name: 'Olivia Parker', title: 'Data Scientist', img: 'https://via.placeholder.com/150?text=Olivia' },
        { name: 'Liam Turner', title: 'Farm Operations Manager', img: 'https://via.placeholder.com/150?text=Liam' },
        { name: 'Mason Clark', title: 'Agricultural Engineer', img: 'https://via.placeholder.com/150?text=Mason' }
      ],
      supervisor: { name: 'Dr. Isabella Thomas', description: 'Expert in precision agriculture and data analytics.', img: 'https://via.placeholder.com/150?text=Isabella' },
      customer: { name: 'FarmTech Solutions', description: 'Providing technology solutions for modern farms.', img: 'https://via.placeholder.com/150?text=FarmTech' },
      features: [
        { feature: 'Crop Monitoring', description: 'Real-time monitoring of crop health.', iconColor: '#4CAF50' },
        { feature: 'Yield Prediction', description: 'Using data analytics for accurate yield predictions.', iconColor: '#2196F3' },
        { feature: 'Automated Machinery', description: 'Using autonomous machinery for farming tasks.', iconColor: '#FF9800' }
      ],
      technologies: [
        { tech: 'Drones', description: 'Using drones for aerial crop monitoring.', iconColor: '#FF5722' },
        { tech: 'Big Data Analytics', description: 'Analyzing data for improved farming decisions.', iconColor: '#673AB7' },
        { tech: 'Autonomous Tractors', description: 'Self-driving tractors for efficient farming.', iconColor: '#FFEB3B' }
      ]
    },
    6: {
      name: 'Vertical Farming Project',
      description: 'A project to develop vertical farming techniques for urban spaces.',
      headerImage: 'https://via.placeholder.com/1500x300?text=Vertical+Farming',
      team: [
        { name: 'Ethan Harris', title: 'Agricultural Engineer', img: 'https://via.placeholder.com/150?text=Ethan' },
        { name: 'Mia Lewis', title: 'Urban Farming Specialist', img: 'https://via.placeholder.com/150?text=Mia' },
        { name: 'Daniel Walker', title: 'Technology Lead', img: 'https://via.placeholder.com/150?text=Daniel' }
      ],
      supervisor: { name: 'Dr. William Moore', description: 'Pioneer in vertical farming and sustainable agriculture.', img: 'https://via.placeholder.com/150?text=William' },
      customer: { name: 'Urban Farms Inc.', description: 'Leading the way in urban farming innovations.', img: 'https://via.placeholder.com/150?text=Urban+Farms' },
      features: [
        { feature: 'Space Optimization', description: 'Maximizing crop yield in limited urban spaces.', iconColor: '#673AB7' },
        { feature: 'LED Lighting', description: 'Using LED lighting for year-round growth.', iconColor: '#FF5722' },
        { feature: 'Automated Nutrient Delivery', description: 'Precise delivery of nutrients to plants.', iconColor: '#2196F3' }
      ],
      technologies: [
        { tech: 'Hydroponic Systems', description: 'Efficient growth without soil.', iconColor: '#4CAF50' },
        { tech: 'Automated Systems', description: 'Automation for watering and nutrient delivery.', iconColor: '#FF9800' },
        { tech: 'Climate Control', description: 'Maintaining optimal conditions for growth.', iconColor: '#FFEB3B' }
      ]
    },
    7: {
      name: 'Drought-Resistant Crops',
      description: 'Developing crops that can withstand drought conditions.',
      headerImage: 'https://via.placeholder.com/1500x300?text=Drought+Resistant+Crops',
      team: [
        { name: 'Chloe Roberts', title: 'Lead Biotechnologist', img: 'https://via.placeholder.com/150?text=Chloe' },
        { name: 'Evelyn Hall', title: 'Genetics Specialist', img: 'https://via.placeholder.com/150?text=Evelyn' },
        { name: 'Benjamin Carter', title: 'Agronomist', img: 'https://via.placeholder.com/150?text=Benjamin' }
      ],
      supervisor: { name: 'Dr. Amelia Edwards', description: 'Expert in crop genetics and biotechnology.', img: 'https://via.placeholder.com/150?text=Amelia' },
      customer: { name: 'AgriBioTech', description: 'Leading provider of advanced agricultural biotechnology solutions.', img: 'https://via.placeholder.com/150?text=AgriBioTech' },
      features: [
        { feature: 'Genetic Modification', description: 'Enhancing crop resistance to drought.', iconColor: '#2196F3' },
        { feature: 'Stress Testing', description: 'Testing crops under simulated drought conditions.', iconColor: '#673AB7' },
        { feature: 'Farmer Training', description: 'Training farmers to grow drought-resistant crops.', iconColor: '#FF5722' }
      ],
      technologies: [
        { tech: 'Gene Editing', description: 'CRISPR technology for crop modification.', iconColor: '#4CAF50' },
        { tech: 'Stress Simulation', description: 'Simulating drought conditions for research.', iconColor: '#FF9800' },
        { tech: 'Soil Moisture Sensors', description: 'Monitoring soil conditions for optimal growth.', iconColor: '#FFEB3B' }
      ]
    },
    8: {
      name: 'Organic Farming Initiative',
      description: 'A project aimed at promoting organic farming practices.',
      headerImage: 'https://via.placeholder.com/1500x300?text=Organic+Farming+Initiative',
      team: [
        { name: 'Zoe Taylor', title: 'Organic Farming Specialist', img: 'https://via.placeholder.com/150?text=Zoe' },
        { name: 'Ava Anderson', title: 'Soil Scientist', img: 'https://via.placeholder.com/150?text=Ava' },
        { name: 'Lucas Thompson', title: 'Farm Manager', img: 'https://via.placeholder.com/150?text=Lucas' }
      ],
      supervisor: { name: 'Dr. Grace Nelson', description: 'Advocate for sustainable and organic farming practices.', img: 'https://via.placeholder.com/150?text=Grace' },
      customer: { name: 'GreenOrganics', description: 'A company dedicated to promoting organic agriculture.', img: 'https://via.placeholder.com/150?text=GreenOrganics' },
      features: [
        { feature: 'Soil Health', description: 'Promoting soil health through natural farming techniques.', iconColor: '#4CAF50' },
        { feature: 'Natural Pest Control', description: 'Using natural methods to control pests.', iconColor: '#FF5722' },
        { feature: 'Organic Certification', description: 'Helping farms achieve organic certification.', iconColor: '#2196F3' }
      ],
      technologies: [
        { tech: 'Composting', description: 'Turning organic waste into valuable compost.', iconColor: '#673AB7' },
        { tech: 'Biofertilizers', description: 'Using biological fertilizers for soil health.', iconColor: '#FF9800' },
        { tech: 'Integrated Pest Management', description: 'Eco-friendly pest control methods.', iconColor: '#FFEB3B' }
      ]
    },
    9: {
      name: 'Aquaponics Farming',
      description: 'Combining aquaculture and hydroponics for a sustainable farming solution.',
      headerImage: 'https://via.placeholder.com/1500x300?text=Aquaponics+Farming',
      team: [
        { name: 'Jack Lewis', title: 'Aquaponics Specialist', img: 'https://via.placeholder.com/150?text=Jack' },
        { name: 'Sofia Martin', title: 'Fish Farming Expert', img: 'https://via.placeholder.com/150?text=Sofia' },
        { name: 'Owen Walker', title: 'Hydroponics Engineer', img: 'https://via.placeholder.com/150?text=Owen' }
      ],
      supervisor: { name: 'Dr. Lucas Wilson', description: 'Expert in aquaponics systems and sustainable farming.', img: 'https://via.placeholder.com/150?text=Lucas' },
      customer: { name: 'AquaFarm Solutions', description: 'Innovative solutions for aquaponics farming.', img: 'https://via.placeholder.com/150?text=AquaFarm' },
      features: [
        { feature: 'Water Recirculation', description: 'Efficient water use in aquaponics systems.', iconColor: '#2196F3' },
        { feature: 'Nutrient Cycling', description: 'Natural nutrient cycling between fish and plants.', iconColor: '#4CAF50' },
        { feature: 'Energy Efficiency', description: 'Low energy consumption for a sustainable system.', iconColor: '#FF9800' }
      ],
      technologies: [
        { tech: 'Fish Tanks', description: 'Aquaculture systems for fish farming.', iconColor: '#FF5722' },
        { tech: 'Hydroponic Grow Beds', description: 'Beds for growing plants in nutrient-rich water.', iconColor: '#673AB7' },
        { tech: 'Water Pumps', description: 'Pumping water between fish tanks and grow beds.', iconColor: '#FFEB3B' }
      ]
    },
    10: {
      name: 'Digital Farming Platform',
      description: 'A platform to connect farmers, suppliers, and customers.',
      headerImage: 'https://via.placeholder.com/1500x300?text=Digital+Farming+Platform',
      team: [
        { name: 'Ella Scott', title: 'Platform Architect', img: 'https://via.placeholder.com/150?text=Ella' },
        { name: 'Liam Wright', title: 'Backend Developer', img: 'https://via.placeholder.com/150?text=Liam' },
        { name: 'Amelia Hill', title: 'UI/UX Designer', img: 'https://via.placeholder.com/150?text=Amelia' }
      ],
      supervisor: { name: 'Mr. Henry King', description: 'Specialist in digital transformation for agriculture.', img: 'https://via.placeholder.com/150?text=Henry' },
      customer: { name: 'AgriConnect', description: 'Connecting farmers to markets through digital solutions.', img: 'https://via.placeholder.com/150?text=AgriConnect' },
      features: [
        { feature: 'Marketplace', description: 'Online marketplace for farmers and suppliers.', iconColor: '#2196F3' },
        { feature: 'Digital Payments', description: 'Secure and fast payment processing.', iconColor: '#FF9800' },
        { feature: 'Real-Time Analytics', description: 'Providing farmers with data-driven insights.', iconColor: '#4CAF50' }
      ],
      technologies: [
        { tech: 'Cloud Computing', description: 'Scalable cloud platform for the farming community.', iconColor: '#FF5722' },
        { tech: 'Mobile App', description: 'User-friendly mobile application for farmers.', iconColor: '#673AB7' },
        { tech: 'Blockchain', description: 'Secure transactions and traceability.', iconColor: '#FFEB3B' }
      ]
    }
  };

  // الحصول على معرف المشروع من المعلمات
  const { id } = useParams(); // تأكد من استخدام نفس المفتاح المستخدم في `App.js`
  const project = projectsData[id];

  // إذا لم يتم العثور على المشروع
  if (!project) {
    return <Typography variant="h4" component="h2" sx={{ textAlign: 'center', mt: 4 }}>Project not found</Typography>;
  }

  // دالة لعرض المشروع
  const renderProject = () => (
    <>
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <motion.img
          src={project.headerImage}
          alt={project.name}
          width="100%"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', color: '#2E7D32', mb: 2 }}>
          {project.name}
        </Typography>
        <Typography variant="body1" sx={{ color: '#424242', mb: 4 }}>
          {project.description}
        </Typography>
      </Box>

      {/* Team Section */}
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h2" sx={{ textAlign: 'center', mb: 3, color: '#2E7D32' }}>
          <FaUsers style={{ marginRight: '8px' }} /> Team
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {project.team.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card sx={{ boxShadow: 5, borderRadius: 2 }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Avatar alt={member.name} src={member.img} sx={{ width: 100, height: 100, margin: 'auto', mb: 2, border: `5px solid ${member.bgColor || '#2E7D32'}` }} />
                    <Typography variant="h6">{member.name}</Typography>
                    <Typography variant="body2" sx={{ color: '#757575' }}>{member.title}</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Supervisor Section */}
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h2" sx={{ textAlign: 'center', mb: 3, color: '#2E7D32' }}>
          <FaChalkboardTeacher style={{ marginRight: '8px' }} /> Supervisor
        </Typography>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card sx={{ boxShadow: 5, borderRadius: 2 }}>
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={8}>
                      <Typography variant="h6" sx={{ mb: 1 }}>{project.supervisor.name}</Typography>
                      <Typography variant="body2" sx={{ color: '#757575' }}>
                        {project.supervisor.description}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Avatar alt={project.supervisor.name} src={project.supervisor.img} sx={{ width: 120, height: 120, margin: 'auto', border: '5px solid #8E24AA' }} />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Box>

      {/* Customer Section */}
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h2" sx={{ textAlign: 'center', mb: 3, color: '#2E7D32' }}>
          <FaUserTie style={{ marginRight: '8px' }} /> Customer
        </Typography>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card sx={{ boxShadow: 5, borderRadius: 2 }}>
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={8}>
                      <Typography variant="h6" sx={{ mb: 1 }}>{project.customer.name}</Typography>
                      <Typography variant="body2" sx={{ color: '#757575' }}>
                        {project.customer.description}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Avatar alt={project.customer.name} src={project.customer.img} sx={{ width: 120, height: 120, margin: 'auto', border: '5px solid #FF7043' }} />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Box>

      {/* Project Features */}
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h2" sx={{ textAlign: 'center', mb: 3, color: '#2E7D32' }}>
          <FaCog style={{ marginRight: '8px' }} /> Project Features
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {project.features.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card sx={{ boxShadow: 5, borderRadius: 2 }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Box sx={{ fontSize: 40, color: item.iconColor, mb: 1 }}>
                      <FaCog />
                    </Box>
                    <Typography variant="h6">{item.feature}</Typography>
                    <Typography variant="body2" sx={{ color: '#757575' }}>
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Project Technology */}
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h2" sx={{ textAlign: 'center', mb: 3, color: '#2E7D32' }}>
          <FaLaptopCode style={{ marginRight: '8px' }} /> Project Technology
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {project.technologies.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card sx={{ boxShadow: 5, borderRadius: 2 }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Box sx={{ fontSize: 40, color: item.iconColor, mb: 1 }}>
                      <FaLaptopCode />
                    </Box>
                    <Typography variant="h6">{item.tech}</Typography>
                    <Typography variant="body2" sx={{ color: '#757575' }}>
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );

  return (
    <Container>
      {renderProject()}
      {/* Footer Section */}
      <Box sx={{ textAlign: 'center', my: 4, backgroundColor: '#f5f5f5', py: 2 }}>
        <Typography variant="body2" sx={{ color: '#757575' }}>
          &copy; 2024 Your Company. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
}

export default ProjectDetails;
