package com.localfix.config;

import com.localfix.entity.*;
import com.localfix.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final TechnicianProfileRepository technicianRepository;
    private final ServiceCategoryRepository categoryRepository;
    private final ServiceRepository serviceRepository;
    private final BookingRepository bookingRepository;
    private final BookingStatusHistoryRepository historyRepository;
    private final ReviewRepository reviewRepository;
    private final WarrantyRepository warrantyRepository;
    private final ComplaintRepository complaintRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
                           TechnicianProfileRepository technicianRepository,
                           ServiceCategoryRepository categoryRepository,
                           ServiceRepository serviceRepository,
                           BookingRepository bookingRepository,
                           BookingStatusHistoryRepository historyRepository,
                           ReviewRepository reviewRepository,
                           WarrantyRepository warrantyRepository,
                           ComplaintRepository complaintRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.technicianRepository = technicianRepository;
        this.categoryRepository = categoryRepository;
        this.serviceRepository = serviceRepository;
        this.bookingRepository = bookingRepository;
        this.historyRepository = historyRepository;
        this.reviewRepository = reviewRepository;
        this.warrantyRepository = warrantyRepository;
        this.complaintRepository = complaintRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() > 0) return;

        // 1. Seed Users
        User admin = new User("LocalFix Admin", "admin@localfix.in", "+91 94440 00000",
                passwordEncoder.encode("admin123"), Role.ROLE_ADMIN, "T. Nagar");
        userRepository.save(admin);

        User customer = new User("Aakash Malhotra", "aakash@gmail.com", "+91 99999 11122",
                passwordEncoder.encode("password123"), Role.ROLE_CUSTOMER, "Velachery");
        customer = userRepository.save(customer);

        User tech1User = new User("Ravi Kumar", "ravi@localfix.in", "+91 98765 43210",
                passwordEncoder.encode("password123"), Role.ROLE_TECHNICIAN, "Velachery");
        tech1User = userRepository.save(tech1User);

        User tech2User = new User("Priya Ananya", "priya@cleanpro.in", "+91 98765 12345",
                passwordEncoder.encode("password123"), Role.ROLE_TECHNICIAN, "Anna Nagar");
        tech2User = userRepository.save(tech2User);

        User tech3User = new User("Suresh Babu", "suresh@plumbfix.in", "+91 98765 67890",
                passwordEncoder.encode("password123"), Role.ROLE_TECHNICIAN, "Adyar");
        tech3User = userRepository.save(tech3User);

        // 2. Seed Technician Profiles
        TechnicianProfile p1 = new TechnicianProfile();
        p1.setUser(tech1User);
        p1.setBusinessName("Ravi Cool & Electricals");
        p1.setCategory("AC Repair & Service");
        p1.setSubCategories("AC Filter Cleaning, Gas Charging, PCB Repair");
        p1.setRating(4.9);
        p1.setReviewCount(142);
        p1.setCompletedJobs(380);
        p1.setStartingPrice(199);
        p1.setLocation("Velachery, Chennai");
        p1.setServiceRadiusKm(15);
        p1.setIsVerified(true);
        p1.setYearsExperience(8);
        p1.setResponseTime("15 mins");
        p1.setBio("Certified HVAC Technician with 8+ years specializing in Inverter split & window ACs.");
        p1.setAbout("We provide complete doorstep AC installation, deep jet pump servicing, leak detection, and gas refilling across South Chennai.");
        p1.setVerificationStatus("VERIFIED");
        p1 = technicianRepository.save(p1);

        TechnicianProfile p2 = new TechnicianProfile();
        p2.setUser(tech2User);
        p2.setBusinessName("SparkleClean Chennai");
        p2.setCategory("Cleaning");
        p2.setSubCategories("Deep Home Cleaning, Kitchen Deep Clean, Bathroom Sanitization");
        p2.setRating(4.8);
        p2.setReviewCount(98);
        p2.setCompletedJobs(210);
        p2.setStartingPrice(499);
        p2.setLocation("Anna Nagar, Chennai");
        p2.setServiceRadiusKm(20);
        p2.setIsVerified(true);
        p2.setYearsExperience(5);
        p2.setResponseTime("25 mins");
        p2.setBio("Professional residential & office deep cleaning using eco-friendly German solutions.");
        p2.setAbout("Trained team with industrial vacuum cleaners and steam sanitizers ensuring 99.9% bacteria-free homes.");
        p2.setVerificationStatus("VERIFIED");
        p2 = technicianRepository.save(p2);

        TechnicianProfile p3 = new TechnicianProfile();
        p3.setUser(tech3User);
        p3.setBusinessName("Chennai Plumb Masters");
        p3.setCategory("Plumbing");
        p3.setSubCategories("Pipe Leakage, Tap & Mixer Fitting, Motor Installation, Water Tank Cleaning");
        p3.setRating(4.7);
        p3.setReviewCount(84);
        p3.setCompletedJobs(195);
        p3.setStartingPrice(149);
        p3.setLocation("Adyar, Chennai");
        p3.setServiceRadiusKm(18);
        p3.setIsVerified(true);
        p3.setYearsExperience(7);
        p3.setResponseTime("20 mins");
        p3.setBio("Licensed master plumber experienced in residential pipelines, motor setups & sanitary fittings.");
        p3.setAbout("Prompt emergency leakage repairs, flush valve changes, concealed pipe repair with 30-day workmanship warranty.");
        p3.setVerificationStatus("VERIFIED");
        p3 = technicianRepository.save(p3);

        // 3. Seed 13 Service Categories
        List<ServiceCategory> categories = Arrays.asList(
                new ServiceCategory("ac", "AC Repair & Service", "ஏசி பழுது மற்றும் சேவை", "Snowflake", 14, "Cooling issues, jet clean, gas refill, PCB repair", "#0284c7", true),
                new ServiceCategory("electrical", "Electrical", "மின்சார வேலைகள்", "Zap", 22, "Fan, light, MCB tripping, inverter wiring", "#d97706", true),
                new ServiceCategory("plumbing", "Plumbing", "பிளம்பிங்", "Droplets", 18, "Leakages, blockages, motor & tap fitting", "#0369a1", true),
                new ServiceCategory("cleaning", "Cleaning", "வீடு சுத்தம்", "Sparkles", 16, "Full home deep cleaning, bathroom & kitchen sanitize", "#0d9488", false),
                new ServiceCategory("appliances", "Appliance Repair", "சாதனங்கள் பழுது", "Tv", 19, "Washing machine, fridge, microwave, chimney", "#4f46e5", true),
                new ServiceCategory("carpentry", "Carpenter", "மர வேலைகள்", "Hammer", 12, "Furniture repair, locks, hinges, custom woodwork", "#b45309", false),
                new ServiceCategory("painting", "Painting", "வண்ணம் பூசுதல்", "Paintbrush", 8, "Interior & exterior wall painting, waterproof", "#e11d48", false),
                new ServiceCategory("pest-control", "Pest Control", "பூச்சி கட்டுப்பாடு", "Bug", 10, "Cockroaches, bed bugs, termites, anti-dengue", "#059669", false),
                new ServiceCategory("home-maintenance", "Home Maintenance", "வீட்டு பராமரிப்பு", "Home", 15, "Drilling, hanging, minor home fixes", "#6366f1", false),
                new ServiceCategory("washing-machine", "Washing Machine", "வாஷிங் மெஷின்", "RotateCw", 9, "Top load, front load motor, drum & drain fix", "#2563eb", false),
                new ServiceCategory("refrigerator", "Refrigerator", "குளிர்சாதன பெட்டி", "ThermometerSnowflake", 11, "Single door, double door, frost & thermostat", "#0891b2", false),
                new ServiceCategory("water-purifier", "RO / Water Purifier", "தண்ணீர் சுத்திகரிப்பான்", "Filter", 13, "Filter membrane change, TDS check, motor fix", "#0284c7", false),
                new ServiceCategory("tv-repair", "TV Repair", "தொலைக்காட்சி பழுது", "Tv", 7, "LED, OLED panel repair, sound & backlight repair", "#7c3aed", false)
        );
        categoryRepository.saveAll(categories);

        // 4. Seed Services
        List<ServiceEntity> services = Arrays.asList(
                new ServiceEntity("s101", "AC Annual Maintenance & Jet Service", "ஏசி முழு சேவை", "ac", "Deep cleaning with indoor foam spray, pressure jet clean, filter wash, and cooling check", 499, 60, 199),
                new ServiceEntity("s102", "AC Gas Refill (R32 / R410A)", "ஏசி கேஸ் நிரப்புதல்", "ac", "Comprehensive vacuuming, leak test, and refrigerant topping with pressure measurement", 1899, 90, 199),
                new ServiceEntity("s201", "2BHK Deep Home Cleaning", "2BHK முழு வீடு சுத்தம்", "cleaning", "Complete mechanized floor scrubbing, window channels, cobweb removal & bathroom descaling", 1499, 180, 0),
                new ServiceEntity("s301", "Emergency Pipe Leakage Repair", "அவசர குழாய் பழுது", "plumbing", "Rapid response leak fix, Teflon sealing, damaged elbow/coupler replacement", 299, 45, 149)
        );
        serviceRepository.saveAll(services);

        // 5. Seed Initial Booking
        Booking b1 = new Booking();
        b1.setBookingNumber("LF-CHN-9482");
        b1.setCustomer(customer);
        b1.setTechnician(p1);
        b1.setServiceId("s101");
        b1.setServiceName("AC Annual Maintenance & Jet Service");
        b1.setServicePrice(499);
        b1.setVisitCharge(199);
        b1.setPartsCharge(0);
        b1.setGst(126);
        b1.setDiscount(0);
        b1.setTotalPrice(824);
        b1.setStatus(BookingStatus.ON_THE_WAY);
        b1.setScheduledDate("2026-09-29");
        b1.setScheduledTime("10:30 AM");
        b1.setServiceLocation("12, 4th Cross Street, Velachery, Chennai - 600042");
        b1.setServiceArea("Velachery");
        b1.setProblemDescription("AC is not cooling properly. Ice formation visible on outdoor unit.");
        b1.setPaymentMethod("upi");
        b1.setPaymentStatus("PENDING");
        b1.setOtpCode("4829");
        b1.setWarrantyDays(30);
        Booking savedB1 = bookingRepository.save(b1);

        BookingStatusHistory h1 = new BookingStatusHistory(savedB1, BookingStatus.PENDING, "Booking confirmed by customer");
        BookingStatusHistory h2 = new BookingStatusHistory(savedB1, BookingStatus.TECHNICIAN_ASSIGNED, "Technician Ravi Kumar assigned");
        BookingStatusHistory h3 = new BookingStatusHistory(savedB1, BookingStatus.TECHNICIAN_ACCEPTED, "Ravi Kumar accepted the request");
        BookingStatusHistory h4 = new BookingStatusHistory(savedB1, BookingStatus.ON_THE_WAY, "Technician is on the way (ETA 15 mins)");
        historyRepository.saveAll(Arrays.asList(h1, h2, h3, h4));

        // 6. Seed Warranty for completed sample
        Warranty w1 = new Warranty();
        w1.setBooking(savedB1);
        w1.setCustomer(customer);
        w1.setTechnician(p1);
        w1.setServiceName("AC Annual Maintenance & Jet Service");
        w1.setWarrantyDays(30);
        warrantyRepository.save(w1);

        // 7. Seed Sample Review
        Review r1 = new Review();
        r1.setBooking(savedB1);
        r1.setCustomer(customer);
        r1.setTechnician(p1);
        r1.setRating(5.0);
        r1.setQualityRating(5.0);
        r1.setProfessionalismRating(5.0);
        r1.setPunctualityRating(5.0);
        r1.setComment("Ravi arrived on time in Velachery. Excellent jet clean service, cooling restored immediately!");
        r1.setServiceUsed("AC Annual Maintenance & Jet Service");
        reviewRepository.save(r1);

        // 8. Seed Sample Complaint
        Complaint c1 = new Complaint();
        c1.setBooking(savedB1);
        c1.setCustomer(customer);
        c1.setTechnician(p1);
        c1.setCategory("Work Quality");
        c1.setDescription("Water leakage observed from indoor unit 2 hours after jet cleaning.");
        c1.setStatus("OPEN");
        complaintRepository.save(c1);
    }
}
