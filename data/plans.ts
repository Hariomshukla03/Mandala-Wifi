export type Plan = {
  id: string;
  name: string;
  speed: number;
  description: string;
  popular?: boolean;
  features: string[];
  audience: 'home' | 'business';
  sixMonths?: number | null;
  twelveMonths?: number;
  monthly?: number;
  yearly?: number;
};

export const plans: Plan[] = [
  {id:'unlimited-15',name:'Essential',speed:15,sixMonths:null,twelveMonths:4999,description:'Dependable unlimited internet for browsing, learning and everyday use.',features:['Unlimited data','Fiber connection','24/7 support'],audience:'home'},
  {id:'unlimited-40',name:'Everyday',speed:40,sixMonths:null,twelveMonths:5999,description:'A smooth connection for streaming, video calls and connected homes.',features:['Unlimited data','Fiber connection','24/7 support'],audience:'home'},
  {id:'unlimited-60',name:'Smart',speed:60,sixMonths:4799,twelveMonths:7999,description:'More speed and flexibility for busy households with several devices.',popular:true,features:['Unlimited data','Fiber connection','24/7 support','Priority support'],audience:'home'},
  {id:'unlimited-80',name:'Power',speed:80,sixMonths:5599,twelveMonths:8999,description:'Our fastest unlimited plan for work, entertainment and power users.',features:['Unlimited data','Fiber connection','24/7 support','Priority support'],audience:'home'},
  {id:'business-100',name:'Business Core',speed:100,monthly:1499,yearly:15290,description:'A reliable foundation for growing teams.',features:['Business-grade fiber','Priority support','Scalable bandwidth','Static IP ready*'],audience:'business'},
  {id:'business-300',name:'Business Plus',speed:300,monthly:2999,yearly:30590,description:'Serious bandwidth for always-on operations.',popular:true,features:['Business-grade fiber','Priority support','Scalable bandwidth','Static IP ready*'],audience:'business'}
];
