import React from "react";
import './map.css';
import deno from './deno.jpg';
import davi from './davi.jpg';
import collins from './collins.jpg';
import gikoyo from './gikoyo.jpg';
import caro from './caro.jpg';


  
  const people = [
    {
      name: "Dennis Mwaniki",
      imageUrl: deno,
      twitterUrl: "https://twitter.com/alice",
      linkedinUrl: "https://www.linkedin.com/in/alice",
    },
    {
      name: "David Mwaura​",
      imageUrl: davi,
      twitterUrl: "https://twitter.com/bob",
      linkedinUrl: "https://www.linkedin.com/in/bob",
    },
    {
      name: "Caroline Nzioka​",
      imageUrl: caro,
      twitterUrl: "https://twitter.com/carol",
      linkedinUrl: "https://www.linkedin.com/in/carol",
    },
    {
      name: "Gikonyo Otieno​​",
      imageUrl: gikoyo,
      twitterUrl: "https://twitter.com/carol",
      linkedinUrl: "https://www.linkedin.com/in/carol",
    },
    {
      name: "Collins Chirchir​​",
      imageUrl: collins,
      twitterUrl: "https://twitter.com/carol",
      linkedinUrl: "https://www.linkedin.com/in/carol",
    },
  ];

  function About()  {
      return (
    <div className="p-5 m-0" >
        <div className="relative bg-white">
        <div className="h-56 bg-custom-orange sm:h-72 lg:absolute lg:left-0 lg:h-full lg:w-1/2">
          <img
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="Support team"
          />
        </div>
        <div className="relative mx-auto max-w-7xl py-8 px-6 sm:py-12 lg:py-16">
          <div className="lg:mr-0 lg:ml-auto lg:w-1/2 lg:max-w-none lg:pl-10">       
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Your Cargo, Our Priority
            </h2>
            <p className="mt-6 text-lg text-gray-500">
            At CargoTracking, our team is composed of dedicated professionals with extensive experience in logistics, technology, and customer service.
             We are committed to leveraging our collective expertise to deliver the most accurate and real-time cargo tracking information. 
            Our passion for innovation and commitment to excellence have made us the preferred choice for countless customers globally.
            </p>
            <div className="mt-8 overflow-hidden">
              <dl className="-mx-8 -mt-8 flex flex-wrap">
                <div className="flex flex-col px-8 pt-8">
                  <dt className="order-2 text-base font-medium text-gray-500">Delivery</dt>
                  <dd className="order-1 text-2xl font-bold text-custom-orange sm:text-3xl sm:tracking-tight">24/7</dd>
                </div>
                <div className="flex flex-col px-8 pt-8">
                  <dt className="order-2 text-base font-medium text-gray-500">Satisfaction</dt>
                  <dd className="order-1 text-2xl font-bold text-custom-orange sm:text-3xl sm:tracking-tight">99.9%</dd>
                </div>
                <div className="flex flex-col px-8 pt-8">
                  <dt className="order-2 text-base font-medium text-gray-500">Packages Delivered</dt>
                  <dd className="order-1 text-2xl font-bold text-custom-orange sm:text-3xl sm:tracking-tight">100k+</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
        </div>
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
              Trusted by the world’s most innovative teams
            </h2>
            <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
              <img
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                src={require('./logos/abss-logo.png')}
                alt="Abss Warehouse"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                src={require('./logos/arthrosource-logo.png')}
                alt="Arthrosource"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                src={require('./logos/tutakubebea.png')}
                alt="Tutakubebea"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
                src={require('./logos/vintage-logo.png')}
                alt="Vintage Skills"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
                src={require('./logos/bureti-logo.png')}
                alt="Bureti Tea"
                width={158}
                height={48}
              />
            </div>
          </div>
        </div>
        <div className="bg-white">
        <div className="mx-auto max-w-7xl py-12 px-6 text-center lg:px-8 lg:py-24">
            <div className="space-y-12">
            <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Meet our team</h2>
                <p className="text-xl text-gray-500">
                The driving force committed to revolutionizing cargo tracking
                </p>
            </div>


            <ul
                className="mx-auto space-y-16 sm:grid sm:grid-cols-2 sm:gap-16 sm:space-y-0 lg:max-w-5xl lg:grid-cols-3"
            >
                {people.map((person) => (
                <li key={person.name}>
                    <div className="space-y-6">
                    <img className="mx-auto h-40 w-40 rounded-full xl:h-56 xl:w-56" src={person.imageUrl} alt="" />
                    <div className="space-y-2">
                        <div className="space-y-1 text-lg font-medium leading-6">
                        <h3>{person.name}</h3>
                        </div>
                        <ul className="flex justify-center space-x-5">
                        <li>
                            <a href={person.twitterUrl} className="text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Twitter</span>
                            <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                            </svg>
                            </a>
                        </li>
                        <li>
                            <a href={person.linkedinUrl} className="text-gray-400 hover:text-gray-500">
                            <span className="sr-only">LinkedIn</span>
                            <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                fillRule="evenodd"
                                d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                                clipRule="evenodd"
                                />
                            </svg>
                            </a>
                        </li>
                        </ul>
                    </div>
                    </div>
                </li>
                ))}
            </ul>
            </div>
        </div>
        </div>
    </div>
      );
  }
  

  export default About;