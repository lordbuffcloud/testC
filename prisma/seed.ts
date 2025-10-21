import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Patrol flash cards data
const patrolCards = [
  // OVI Response Procedures
  { question: "What Form is used for OVI/Alcohol related responses", answer: "DD Form 1920" },
  { question: "What is utilized to record results of SFST", answer: "DD Form 1920 and OVI Field Notes" },
  { question: "Before Conducting SFST what must the SF Member do", answer: "Explain and Demonstrate" },
  { question: "IF information not requested in 1920 where should the sf member put it", answer: "Incident report" },
  { question: "What are the SFST Approved test", answer: "Horizontal Gaze Nystagmus, Walk and Turn, One Leg Stand (Additional SFST are IAW AFI 31-218)" },
  { question: "How can an SF member be certified on SFST", answer: "MUST attend the National Highway Traffic Safety Administration (NHTSA) Certification Course" },
  { question: "If a member is not certified, what must they do", answer: "Contact a certified member to conduct SFST" },
  { question: "What is The Department of Defense's policy to adopt and make state traffic laws applicable on military installations", answer: "IAW DoDD 5525.4, Para 3" },
  { question: "What is the OVI 3 part response procedure", answer: "Vehicle in motion, personal contact, pre arrest screening" },
  { question: "If an OVI arrest is made who determines if a tow needs to be met", answer: "Flight chief determine disposition IAW WPAFBI 31-118 PARA 3.7" },
  { question: "What MUST be accomplished with all tows", answer: "Inventory Worksheet and incident report" },
  { question: "What will a driver of a vehicle cited for OVI be advised of prior to BAC testing", answer: "Implied Consent Law" },
  { question: "What are the 3 different methods to obtain BAC", answer: "Blood, Breath, and urine" },
  { question: "Does a violate have an absolute right to have an attorney present before deciding to submit a test", answer: "NO" },
  { question: "After the implied consent policy is read how many minutes will be given for the deprivation period", answer: "20 minutes" },
  { question: "What are you checking during the deprivation period", answer: "if the suspect has anything in their mouth. Also deny any food or drink until after testing." },
  { question: "How long do you have to conduct all testing", answer: "Federal law does not dictate but we follow Ohio standards which state 3 hr from point of initial stop." },

  // Aircraft Piracy (Hijacking Plan)
  { question: "Immediately upon notification of an unannounced air craft movement in your area what will you do", answer: "Response and prevent aircraft movement (position vehicle at rear and sides if possible, but at minimum block the front.) If authorities want you out of site block nearest exit while remaining out of site." },
  { question: "Can some aircraft back up", answer: "YES (C-130 and C17)" },
  { question: "Who will determine if everything is deemed secure", answer: "Flight Chief and BDOC by talking to tower" },
  { question: "If a aircraft is taxiing what should you do", answer: "Attempt to block the taxiway and deny the aircraft access to runway." },
  { question: "How should you be positioned", answer: "Remain behind cover, maintain vigilance and secure the area/contain the situation." },
  { question: "If you are able to what should you attempt to do to the suspect", answer: "Challenge (place at a disadvantage and way from the resource)" },
  { question: "After a suspect is detained what should you immediate action be", answer: "Purge the area for possible threats or explosives" },
  { question: "How big will the cordon be", answer: "2000 feet or as directed by IC" },
  { question: "Who is the initial IC", answer: "Flight chief until the arrival of higher authority." },
  { question: "We have initial jurisdiction for all air piracy on WPAFB until who arrives", answer: "Federal Aviation Administration or the Federal Bureau of investigations." },
  { question: "When will the FAA be in charge", answer: "Events in which are airborn or when the aircraft is on the ground and all hatches/doors are secure." },
  { question: "When will the FBI be in charge", answer: "when the aircraft is on the ground and doors/hatches are still open." },

  // Open Containers
  { question: "If drug paraphernalia or an open container is the only violation, what will you issue the individual", answer: "USDCVN (1805)" },

  // General Responsibilities
  { question: "What are your Primary Duties as an SF Patrolman", answer: "Protecting personnel, protecting property, preventing pilferage, supervising road traffic, enforcing traffic laws and regulations, maintaining good order, furnishing information and directions, community policing, preforming escorts, building checks. (Note be constantly alert as emergencies happen with no warning)" },
  { question: "Where will reports and paperwork be inputted", answer: "AFJIS on the same duty day as the incident" },
  { question: "Upon assuming post what will you do", answer: "Conduct change over IAW Chapter 1 of this instruction, account for and utilize firstnet devices." },
  { question: "What should you utilize during incidents", answer: "Android Tactical Awareness Kit (ATAK)" },

  // Definition of Apprehension and Detention
  { question: "What is an Arrest", answer: "Generally used of legal authority to deprive a person of his or her freedom of movement." },
  { question: "What is an arrest generally made with", answer: "Arrest warrant." },
  { question: "When can an arrest be made without a warrant", answer: "If probable cause and exigent circumstances are present at the time of arrest." },
  { question: "What is an Apprehension", answer: "Taking a person (SF purposes, a military member) into custody" },
  { question: "What is Detention", answer: "Legal authority to temporary restrict a person of his or her freedom of movement for an investigatory purpose. (Terry Stop)" },
  { question: "When can you detain someone", answer: "For a limited time related to a military purpose (While determining if a crime was committed, who was involved, and for administrative purposes such as barment procedures)." },
  { question: "Who is responsible for protecting personnel and property under their jurisdiction and for maintaining order on the installation", answer: "Air Force Installation Commander" },
  { question: "What can the installation commander authorize", answer: "The granting or denying of access to their installation and to exclude or remove persons who presence is unauthorized. (CANNOT be delegated)" },
  { question: "What is probable cause for apprehension", answer: "Exists when there is a reasonable basis for believing a crime has been committed, based on the totality of the circumstances. This means the apprehension must be based upon everything that the apprehending officer knows or reasonably believes at the time the apprehension is made. An apprehension is a seizure under the 4th and 14th Amendment. A seizure is the taking of items or persons by authorities, for evidence at a court-martial or other judicial or administrative proceeding" },

  // Uniform Code of Military Justice Apprehension
  { question: "Authority Is derived from", answer: "10 USC 807 art 7" },

  // Apprehension and Detention Procedures
  { question: "Prior to affecting an apprehension or detention you should ascertain what", answer: "If the suspect is military of civilian. (SF may NOT apprehend or arrest a civilian)" },
  { question: "If you have jurisdictional questions prior to an apprehension or detention, who can you contact", answer: "SJA" },
  { question: "Apprehensions and detention are generally warranted when what conditions exist", answer: "Violator is dangerous to themselves or others, Probable Cause exist to believe the suspect commented a crime, information about the violate or the violation in question cannot be obtained at the scene." },
  { question: "Apprehension is equivalent to what", answer: "Arrest in civilian terminology but is not the same under UCMJ definitions." },
  { question: "What steps should you complete for an apprehension", answer: "Handcuff immediately, conduct a search, prior to questioning advise of rights." },
  { question: "What card or form can be used to advise rights", answer: "DAF Form 1168, or Advisement of Rights Card AFVA 31-231." },
  { question: "Military is advised of their rights IAW what", answer: "Article 31 of the UCMJ" },
  { question: "Civilians are advised of their rights IAW what", answer: "Fifth amendment to the constitution" },
  { question: "When can a juvenile be interviewed", answer: "When a parent or legal guardian is present" },
  { question: "Military personnel apprehended including TDY who will you contact", answer: "Individuals first sergeant or commander if enlisted" },
  { question: "Officers Apprehended including TDY who will you contact", answer: "Individuals Commander, if you cannot contact the commander brief the DFC or SF operations Officer" },

  // Search and Seizure
  { question: "What Amendments govern search and seizure", answer: "4th and 14th Amendment" },
  { question: "Any evidence gathered must be supported by what", answer: "Probable cause unless there is an exception" },
  { question: "What is a search", answer: "an examination of a person. Object or locations to locate weapons, evidence or contraband." },
  { question: "Does a mere suspicion establish probable cause", answer: "NO" },
  { question: "What is Plain View Doctrine and Seizure", answer: "The rule that a law enforcement officer may seize objects which are in plain view if they have probable cause to believe the item is contraband or evidence of a crime. The law enforcement officer must observe the property or evidence in a reasonable manner. It is an exception to the requirement for a search warrant/authorization. For example, an SF member stops a motorist for a minor traffic violation and can see a pistol in the car or a marijuana plant on the back seat" },
  { question: "What are requirements of plain view", answer: "The officer did not violate the 4th amendment in arriving at the place, the objects incriminating characts are immediately apparent, the officer has a lawful right of access to the object." },
  { question: "When can you conduct a protective frisk/pat down (Terry Frisk)", answer: "SF Member reasonably suspect the individual is involved in criminal activity and believed to be armed and presently dangerous." },
  { question: "What can you pat down", answer: "Outer layer of clothing" },
  { question: "What is a search incident to lawful apprehension", answer: "police may search, incident to arrest, only the space within an arrestee's 'immediate control,' meaning 'the area from within which they might gain possession of a weapon or destructible evidence.' The area within the person's 'immediate control' is the area which the individual searching could reasonably believe that the person apprehended could reach with a sudden movement to obtain such property." },
  { question: "What will you search for during a crime scene", answer: "Possible threats or hazards and possible suspect of other personnel" },
  { question: "Is probable cause required for a consent search", answer: "NO" },
  { question: "What are requirements to consent search", answer: "Individual must give written or verbal consent, be in a position to remove consent." },
  { question: "Can you ask consent to search on a traffic stop", answer: "Only after the reason for the initial stop is completed and the driver is free to leave." },
  { question: "What form is used for searching of a private dwelling", answer: "AF Form 3226" },
  { question: "What is included in a private dwelling", answer: "on and off the installation (Base Housing) such as single family houses, duplexes and apartments. The Quarters may be owned, leased or rented." },
  { question: "What is not included in a private dwelling", answer: "Barracks, Vessels, Aircrafts, vehicles, tents, bunkers, field encampments and similar places." },
  { question: "What are search authorization exceptions", answer: "Exigent Circumstances and Search of operable vehicle." },
  { question: "Exigent Circumstances", answer: "An emergency situation requiring swift action to prevent imminent danger to life, serious damage to property, to forestall the imminent escape of a suspect, or prevent destruction of evidence. Items and persons may be seized immediately when exigent circumstances exist, to prevent the loss of the item's evidentiary value or to seize a person who poses an imminent risk of flight or physical harm. An SF member should always attempt to obtain a search authorization; however, if a legitimate emergency exists, searches and seizures may be made without a search authorization. Some examples of an Exigent Circumstance include, but not limited to,: if delay may endanger the life of any person; if there is a likelihood that the suspect will escape if not swiftly apprehended; to prevent the suspect from destroying or disposing of evidence; or if" },
  { question: "Search of Operable Vehicle", answer: "Also known as the automobile exception. There is a lower expectation of privacy in an automobile and an automobile is easily moved, so the courts have recognized an exception to the search authorization rule to prevent the loss of evidence. Probable cause is still required. If searching a vehicle based upon probable cause, it must also be based on a likelihood that the vehicle would be easily moved or because SF member would not have the ability or need to seize the entire vehicle as evidence and securely store the vehicle. If the intent to impound the vehicle already exists, we may have the obligation to seek search authorization because the vehicle will no longer be moved. Contact SJA for guidance" },
  { question: "What searches do not require probable cause", answer: "Abandoned property, confinement facilities and government property." },

  // Transporting Personnel in Custody
  { question: "All personnel being transported will be what", answer: "Handcuffed and searched" },
  { question: "Will seatbelts be used", answer: "YES ALWAYS" },
  { question: "What will you inform BDOC before and after transport", answer: "Full vehicle reg and starting/ending mileage." },
  { question: "Where do you position the suspect", answer: "When transporting a suspect in a vehicle, which has a safety screen or cage, place the person in custody, by him/herself, in the rear seat of the vehicle. If the vehicle has no screen or cage, place suspect in the rear passenger side seat of the vehicle. An additional SF member will be positioned in the rear driver side seat." },
  { question: "What are the booking requirements", answer: "Fingerprinting, DNA and Photos IAW DAFI 31-103" },

  // Traffic Enforcement
  { question: "What is the Air Force Traffic Enforcement Goal", answer: "Reduction of traffic related deaths, injuries and property damage" },
  { question: "How do we accomplish the goal", answer: "Deterrence" },
  { question: "If conducting speed, how should you be positioned", answer: "Parked in an advantageous position and know the speed zone, do not conceal your vehicle or position, park in a well lit area or open area while utilizing parking lights." },
  { question: "Can patrols use discretion", answer: "YES based upon professional judgment" },
  { question: "What should patrols consider before enforcement actions", answer: "Danger to the driver and other person or property, weather, road conditions and visibility, traffic conditions at the time of violation, use of required protection equipment." },

  // Vehicle Pursuit Policy
  { question: "Is pursuit driving dangerous", answer: "YES and should be avoided except in extreme conditions" },
  { question: "When in pursuit driving what response code", answer: "Code 3 Lights/Siren" },
  { question: "When pursuit is not preferred what alternative actions can be done", answer: "Vehicle intercept, use of barrier system, stop sticks if available" },
  { question: "Primary concern in a vehicle pursuit situation", answer: "Protection of lives, safety of citizens and sf members." },
  { question: "High speed pursuit driving is authorized in operations related to what", answer: "Recovery of nuclear/ chemical resources and other serious crimes where deadly force may be authorized" },
  { question: "What should you weigh prior to a pursuit", answer: "The need to immediately apprehend a suspect against the danger created by the pursuit" },
  { question: "How many marked vehicles can be in a pursuit", answer: "no more than 2 (must have operations lights/sirens)" },
  { question: "What should be considered prior to a pursuit for safety", answer: "How much danger or risk to the public there is, does the need justify the risk, your level of training/experience, seriousness of offense, road and weather conditions, condition of responding patrol vehicle, how much is known about the suspect, pursuit vehicle characteristics, present and potential roadway obstacles, facilities located along the pursuit route, time of day." },
  { question: "Can a pursuit on the installation proceed off", answer: "Yes if specific criteria is met and approved by on duty FC. Offense involved serious bodily harm, kidnapping, rape, death, loss or damage of dod assets, stolen weapons, ammunition, missile, rockets" },
  { question: "Who is responsible for monitoring the pursuit", answer: "Flight Chief (Flight Chief my terminate the pursuit at any time)" },

  // Emergency Driving (non pursuit)
  { question: "What is emergency driving", answer: "Emergency Driving is defined as operation of an authorized emergency vehicle (emergency lights and siren in operation) by SF members in response to a life-threatening situation or a violent crime in progress, using due regard for safety. Regardless of the type of emergency, operate the vehicle with extreme caution. Driving under emergency condition does not relieve drivers from the responsibility to drive with due regard for safety of all persons, nor will these provisions protect you from consequences of your disregard for the safety of others. The use of emergency lights and siren may or may not be necessary; however, use common sense when approaching the scene of the emergency. When engaged in emergency response off the installation, to or from an area in concurrent jurisdiction, or off the installation, emergency lights and sirens will be used" },
  { question: "Who can determine if you need to conduct emergency driving operations", answer: "The decicision rest with each individual, subject to supervisory oversight" },
  { question: "What code is utilized for emergency driving", answer: "Code 3" },

  // Traffic Stops
  { question: "Majority of stops are for what", answer: "Minor Violations" },
  { question: "What are your actions upon initiating a traffic stop", answer: "Select a safe location, use lights/sirens, use due regard for public safety, notify bdoc reason for stop, location, state/license plate number, vehicle description, number of occupants, and if you need a roll by." },
  { question: "How far should you position your patrol vehicle", answer: "1-2 car lengths behind the violator, 3 feet to the left and wheels turned to the left, leave emergency lights on, engine running, and vehicle in park." },
  { question: "If at night what should you use", answer: "Utilize spotlight  angle at violators driver side view mirror" },
  { question: "How should you approach", answer: "Approach from the driver side (some situations may dictate you to approach from the passenger side)" },
  { question: "What do you check prior to approaching the vehicle", answer: "Visually and physically check the trunk" },
  { question: "Where should you stop upon approach", answer: "Stop short of the driver door adjacent to the B pillar" },

  // Traffic Accident investigation
  { question: "What are the primary measures in order of precedence", answer: "Prevent the accident from getting worse, provide first aid to injured, protect life/personal propery/government property/accident scene/identify witnesses, restore normal traffic flow" },
  { question: "What form is used for a Major Accident Investigation", answer: "AF Form 1315" },
  { question: "What form is used for a Minor Vehicle Accident", answer: "AFMC Form 625" },
  { question: "If a Traffic Management and Collision Investigator (TMCI) is not available contact who or direct who", answer: "Contact Ohio State Highway Patrol or Direct and knowledgeable certified patrolman" },
  { question: "What photographs are required", answer: "Required photos are for: establishing approach, final rest, and damage. The investigator will include views of the front, rear, and both sides, as well as showing the license plate or VIN number, direction of travel, damage, probable point of impact, tire marks, and other markings on the pavement." },
  { question: "What will you concentrate on for the narrative", answer: "Verification of any damage old or new, description of what happened including witness account, information concerning fault, where the vehicle has been between the time it was last seen undamaged and the time the damage was discovered" },

  // Off Base/Concurrent Jurisdiction MVA
  { question: "When are you required to response", answer: "When WPAFB property is damaged or when locals are unable to take due to being busy" },
  { question: "What can you do to assist locals", answer: "Controlling the accident scene, care for the injured, routine traffic control, request of assistance (Medical/fire)" },
  { question: "If your patrol vehicle is involved in an accident who can investigate", answer: "Locals who has jurisdiction, the on duty flight chief or an area supervisor. (a knowledgeable patrol can be directed)" },
  { question: "What will be created", answer: "Blotter, AFJIS report with statements" },

  // Calls for Service
  { question: "What is your primary purpose", answer: "Conduct a preliminary investigation, complete field notes, take photos, make diagrams, conduct statements, and do an incident report, along with preserve evidence, collect evidence" },
  { question: "Who must you interview", answer: "Witnesses, victims, complainants and suspects" },

  // Alarm Activation/Anti Robbery
  { question: "How many patrols", answer: "Minimum of 3 respond to establish a cordon" },
  { question: "How do you respond to non protection level alarms", answer: "Code 1 unless instructed by flight chief or lead patrolman" },
  { question: "What is point 1", answer: "Corner of the building to the left of the main entrance." },
  { question: "Who should be detained", answer: "Personnel entering or existing the facility" },
  { question: "What do you do during non duty hours", answer: "Conduct a sweep of the exterior of the facility" },
  { question: "What if the facility is found unsecured or signs of forced entry", answer: "Stop exterior sweep and notify bdoc. Use MWD if possible, once scene is secure continue sweep" },
  { question: "If building is occupied what do you do", answer: "maintain cordon, have bdoc contact facility, get full description of individual exiting the facility, properly authenticate." },

  // Active Shooter
  { question: "Who makes up the Rescue Task Force", answer: "2 SF members and 2 fire department members" },
  { question: "Who is responsible for establishing RTF training", answer: "S3T" },

  // Pink Slip (Emergency Admission or Mentally ill person)
  { question: "What ORC covers Pink Slips in Ohio", answer: "Ohio Revised Code 5122.10, Emergency Hospitalization" },
  { question: "What is required to pink slip", answer: "police officer has reason to believe that the person is mentally ill and represents a substantial risk of physical harm to self or others if allowed to remain at liberty pending examination" },
  { question: "What must a patrol give", answer: "Written Statement stating the circumstances under which such person was taken into custody and reasons for the police officers belief. (Written on form DMH-0025)" },
  { question: "Where can you get the form", answer: "Medical facility front desk" },
  { question: "What do you explain to the suspect", answer: "Name/rank/title of patrolman taking the subject into custody, the custody is no a criminal arrest, the person is being taken for examination by a medical professional at the specified facility." },

  // Code Pink/Amber Alert (Missing Person)
  { question: "What should patrols try to receive", answer: "A current photo" },
  { question: "What should you gather", answer: "all pertinent information needed on an 1168" },
  { question: "How many patrols will be dispatched to the hospital", answer: "Two patrols to secure the crime scene, conduct preliminary investigation and obtain the best possible victim and suspect description." },
  { question: "How should you present yourself when interviewing parents or witnesses", answer: "Be sensitive" },

  // Domestic Disturbance
  { question: "How many patrols should respond", answer: "at least 2" },
  { question: "When do you apprehend", answer: "When a physical aggressor can be identified or alleged" },
  { question: "Who can the suspect be turned over to in a non violent situation", answer: "First sergeant or commander" },
  { question: "Do all call of domestic regardless of their nature require a report", answer: "YES!!! No matter what it turns out to be" },
  { question: "What is your primary role", answer: "To take immediate action to restore order and protect life" },
  { question: "Child abuse/neglect and spousal abuse will be investigated by who", answer: "OSI" },
  { question: "How far should you park away", answer: "At least 1 house away from address" },
  { question: "When should you turn off lights/sirens", answer: "At least a block from the residence" },
  { question: "What three actions can occur", answer: "Referral, Temporary separation, and apprehension." },

  // Loud Noise Complaint
  { question: "What is it recorded on", answer: "AF Form 3907 and inputted into AFJIS" },

  // Shoplifting Procedures
  { question: "Who do you make contact with", answer: "Lost Prevention office" },
  { question: "What do you gather yourself", answer: "Probable Cause by reviewing video" },
  { question: "What form is utilized", answer: "23C" },
  { question: "If evidence is 500 or more what do you do", answer: "Seize property and complete DD form 2817" },
  { question: "If evidence is less than 500 what do you do", answer: "Complete DD From 2817, take photographs and release the property back." },

  // Wright Patterson Hospital Support
  { question: "What are the codes", answer: "Code Violet (violent individual) Code Silver (Individual with a firearm)" },
  { question: "What is a Knocks Box", answer: "Support Box with a pass code (4881) that obtains 5 black canvas bags which has hospital maps and manilla envelopes with access badge and master keys." },

  // Victim Witness Assistance Program VWAP
  { question: "What form number is the VWAP", answer: "DD Form 2701" },
  { question: "Must you always have a copy in your patrol kit", answer: "YES" },
  { question: "Who gets a 2701", answer: "Victim and Witnesses of a crime" },

  // Magistrate Federal Court
  { question: "If an outside agency wants to serve a court summons, warrant or subpoena where should they go", answer: "Meet at building 295" },
  { question: "When can it be issued at a workplace", answer: "If the person is a flight risk or could become hostile" },

  // Facility Checks
  { question: "Know Your facility checks per patrols", answer: "Police 1, Police 5 and Police 7" },

  // Funds Escort
  { question: "For funds between what get one unarmed escort", answer: "10,000 to 29,999" },
  { question: "What do you do for funds over 30,000", answer: "Do not transport in any vehicle occupied by SF, Do not use lights/sirens except in emergencies, Instruct that if they lose sight of SF vehicle pull to the side of the road until SF assumes its position." },

  // Repossession
  { question: "What must they have before they can repossess a vehicle on the installation", answer: "Writ of Replevin or Claim and Delivery" },

  // Abandoned Vehicle
  { question: "What will a vehicle be cited with for abandoned vehicle", answer: "DD Form 1408" },
  { question: "How many hours do you have before a follow up", answer: "72Hours" },
  { question: "What Form is created with the 1408", answer: "DD Form 2504 duplicated" },
  { question: "Who is supposed to follow up", answer: "S2I" },
  { question: "Who is authorized to tow", answer: "Sandys Towing" },
  { question: "What Instruction covers Abandoned vehicle procedures", answer: "WPAFBI 31 218" },

  // Curfew Policy
  { question: "Who does it apply to", answer: "All minors within the confines of WPAFB" },
  { question: "What is considered a minor", answer: "Person under 18 years old not serving in the armed forces" },
  { question: "What is the time", answer: "0001 – 0600 Mon – Sun" },
  { question: "What are exceptions", answer: "Accompanied by the parent or responsible adult, retuning from place of employment, has parental consent, or a sanctioned event" },

  // Stray Animal Procedures
  { question: "Non hostile relines or canines who do you contact non duty", answer: "Green County" },
  { question: "Will SF members respond for stray animals captured", answer: "NO unless its an emergency or abuse" },
  { question: "Can you use deadly force for aggressive animals", answer: "YES" },

  // Bicycle Patrol
  { question: "Can bike patrols be dispatched to incidents", answer: "Yes unless it prevents a reasonable response time" },
  { question: "What must you wear", answer: "Mandatory helmet and safety glasses" },

  // Know Authorized off Base Establishments
  { question: "What is authorized for off base establishments", answer: "Short stops while armed and operating a marked SF vehicle" },

  // Follow up questions to know
  { question: "List 8 examples of concurrent jurisdiction", answer: "Springfield Pike, Kaufman Ave, National Rd, Colonel Glenn Hwy/Airway Rd, Spinning Rd, Woodman Dr, Zink Rd, SR 444, SR 235, Johnson Dr, Sandhill Rd, Lower Valley Pike, Upper Valley Pike, SR 4, Haddix Rd" },
  { question: "What are the types of jurisdiction at WPAFB", answer: "Exclusive Jurisdiction- These areas are under the complete control of the US Government, Prprietary Jurisdiction- WPAFB exercises the rights of a property owner only., Concurret Jurisdiction- These areas are owned by the US Government; however, because the federal government has not affirmatively accepted exclusive federal jurisdictions, civilian law enforcement agencies share jurisdiction with SFS." },
  { question: "While conducting RIEVCs, anytime an operator refuses to consent to the inspection, what should be advised", answer: "Advise the operator a refusal may result in the loss of base driving privileges, Revocation, Loss of base vehicle registration, Barment from the base, And/or administrative or judicial action." },
  { question: "What are the AF Form 1199 Authorized Areas", answer: "Area 5 – 445th Airlift Wing Command Post, Area 7 – West Ramp, Area 18 – PL 2 NAOC aircraft, Area 19 – PL 1 NAOC aircraft, Area 20 – NAOC alert crew billets, Bldg. 259, Area AA – General Flight line, Area H – NNMSA" },
  { question: "While conducting Random Installation entry/Exit Point Checks, personnel shall also inspect for classified documents. What documentation is required for individuals authorized to have classified document", answer: "A letter of authorization or a DD Form 2501, Courier Authorization" },
  { question: "How will the AF Form 1176, Authority to Search and Seize, be prepared and what is required on the reverse side", answer: "Will be prepared in duplicate for the Military Magistrate's signature. The probable cause statement on the reverse of the AF Form 1176 will be a verbatim transcript of your briefing with the Installation Commander/Military Magistrate." },
  { question: "What is the definition of search authority", answer: "An authorization to search is an express permission, written or oral, issued by competent impartial military magistrate to search a person or an area for specified property, evidence or for a specific person and to seize such property, evidence or person." },
  { question: "Any post or patrol could be placed under duress at any given time. What means are available to indicate possible duress", answer: "Portable radio duress, Passing the duress word, Mis-authentication, Failure to answer radio in three attempts, Failure to answer the telephone at your post, Failure to allow entry to a secure post, Deviations from established security" },
  { question: "Alert tones are used to alert posts and patrols of medium-and high-risk situations. What are the alert tones utilized by the 88 SFS", answer: "TONE # 1 SPECIAL ATTENTION (Attention message, BOLOs, major responses, etc.), TONE # 2 ALARM ACTIVATIONS, TONE # 3 FLIGHTLINE EMERGENCIES" },
  { question: "What are the requirements for all police vehicles used in routine or general patrol service", answer: "'Police' markings on both the right and left sides, red/blue lights and siren in proper working order and PA system." },
  { question: "Explain open container evidence collection", answer: "SF members shall mark the level of liquid in the container, Photograph the container, Properly dispose of the container, SF members shall accomplish AF Form 52 describing the item seized and place the AF Form 52 and photograph in the temporary storage locker, Seized alcoholic beverage containers shall not be stored in the S2I evidence room." },
  { question: "Where can surveillance video be viewed for a Infant/Child abduction at the Hospital, and the Base Exchange", answer: "Medical Facility videos can be reviewed at the Emergency Room or Nurses Station, BX/Commissary videos can be reviewed at the Loss Prevention Office" },
  { question: "What locations will be utilizied for BAC testing if the equipment at Bldg 295 is not operational", answer: "Fairborn Police Department for breath testing, the Wright-Patterson Medical Center for blood or urine testing (military/DoD member), or Soin Hospital (Civilians) requiring blood or urine. Cooperation with other local police departments for use of their test equipment is authorized when ours is not operation" },
  { question: "What is the primary purpose of monitoring inmate visitation", answer: "To prevent contraband from being introduced to the inmate or into the facility" },
  { question: "How much and when is physical contact authorizied during an inmates visit and what is not permitted", answer: "Inmates and visitors may have a short embrace at the beginning and end of the visit. Kissing is not permitted." },
  { question: "While on scene at a domestic disturbance, after you have made contact at the door, why should Security Forces personnel request to move the discussion inside", answer: "So the patrolman can observe if there are any injuries requiring treatment, Location and number of the disputants, Visible weapons and threatening moves, Living conditions, Emotional stage of dispute and emotional condition of disputants, Impairment, Children at risk, Physical damage to property" },
  { question: "What is the purpose of conducting an interview with parties involved in a domestic violence situation", answer: "Assess the immediate danger to family members and need for medical assistance or protective custody, Determine whether suspected abuse or neglect is occurring or has occurred, Determine the appropriate response to the situation, Identify the perpetrator if possible, Protect the legal rights of suspects, Identify victims and give them proper assistance" },
  { question: "If a vehicle must be towed, what must SF do prior to towing", answer: "Security Forces will photograph the vehicle to document pre-existing damage/condition and to provide visual evidence of the offense or condition justifying towing." },
  { question: "Prior to towing what must be completed with the towing company", answer: "A joint inventory listing personal property" },
  { question: "What are the reasons for impoundment of POVs", answer: "Inhibits street cleaning or snow removal (after all attempts to locate owner fail).,  Inhibits emergency operations (during natural disaster, fire, increased FPCONs, etc)., Has mechanical defects that create a menace to others., Is disabled by an accident., Is disabled along the alert aircraft route while alert aircraft are on site., Creates a safety hazard., Is left unattended in, or adjacent to a restricted, controlled or off-limits area., Is disabled along DV1 or DV2 (POTUS or VPOTUS) routes., If a driver is detained/apprehended and the location of the vehicle interferes with traffic or road safety, it may be towed if no other driver is available to move it." },
  { question: "What does the US Magistrate have jurisdiction over", answer: "U.S. magistrates 'shall have jurisdiction to try persons accused of, and sentence persons convicted of, misdemeanors', The U.S. Magistrate Court also has jurisdiction over juveniles who commit on-installation misdemeanors" },
  { question: "The Federal Magistrate Court is a venue that enables the enforcement of what category of laws on installations", answer: "Misdemeanor" }
]

async function main() {
  // Create the three fixed decks
  await prisma.deck.upsert({
    where: { key: 'patrol' },
    update: {},
    create: {
      key: 'patrol',
      name: 'Patrol'
    }
  })

  await prisma.deck.upsert({
    where: { key: 'ec' },
    update: {},
    create: {
      key: 'ec',
      name: 'EC'
    }
  })

  await prisma.deck.upsert({
    where: { key: 'bdoc' },
    update: {},
    create: {
      key: 'bdoc',
      name: 'BDOC'
    }
  })

  console.log('Seeded three decks: Patrol, EC, BDOC')

  // Clear existing patrol cards and add new ones
  await prisma.card.deleteMany({
    where: { deckKey: 'patrol' }
  })

  console.log('Cleared existing patrol cards')

  // Add all patrol cards
  for (const card of patrolCards) {
    await prisma.card.create({
      data: {
        deckKey: 'patrol',
        question: card.question,
        answer: card.answer
      }
    })
  }

  console.log(`Added ${patrolCards.length} patrol cards`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
