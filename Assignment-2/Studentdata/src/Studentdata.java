import java.util.*;
class StudentManager {
    private static List<String> studentNames;
    private static Set<Integer> studentIds;
    private static Map<Integer, String> studentData;

    public StudentManager() {
        studentNames = new ArrayList<>();
        studentIds = new HashSet<>();
        studentData = new HashMap<>();
    }

    //Adding Student Data
    public void addStudent(String name, int id) {
        if (!studentIds.contains(id)){
            studentNames.add(name);
            studentIds.add(id);
            studentData.put(id, name);
        }
    }
    //Removing Studnet Data
    public void removeStudent(int id) {
        if (studentIds.contains(id)) {
            String name = studentData.get(id);
            studentNames.remove(name);
            studentIds.remove(id);
            studentData.remove(id);
        }
    }
    //Searching for Student Data
    public String searchStudentName(int id) {
        return studentData.getOrDefault(id, null);
    }

    public List<String> getStudentNames() {
        return studentNames;

    }

    public Set<Integer> getStudentIds() {
        return studentIds;
    }

    public Map<Integer, String> getStudentData() {
        return studentData;
    }
}

class student{
    private String name;
    private int id;
    //Getters and Setters
    public student(String name, int id) {
        this.name = name;
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
}
public class Studentdata {
    public static void main(String[] args) {
        student s1=new student("Elena", 1);
        student s2=new student("Caroline", 2);
        student s3=new student("Stefan", 3);
        student s4=new student("Caroline", 4);//Duplicates are allowed
        
        //List Implementation
        List <String> s_name= new ArrayList<>();
        //Add Functionality
        s_name.add(s1.getName());
        s_name.add(s2.getName());
        s_name.add(s3.getName());
        s_name.add(s4.getName());
        System.out.println("\nList Implementation");
        System.out.println("Before removing an element\n"+s_name);
        //remove functionality
        s_name.remove(s1.getName());
        System.out.println("After removing an element\n"+s_name);
        //search functionality
        System.out.println(" The index of the element " + s3.getName()+" is : "+s_name.indexOf(s3.getName()));
        System.out.println(s_name);

        //Set Implementation
        Set <Integer> s_id= new HashSet<>();
        //Add Functionality
        s_id.add(s1.getId());
        s_id.add(s2.getId());
        s_id.add(s3.getId());
        s_id.add(s4.getId());
        System.out.println("\n\nSet Implementation");
        System.out.println("Before removing an element"+s_id);
        //remove functionality
        s_id.remove(s1.getId());
        System.out.println("After removing an element"+s_id);
        //search functionality
        System.out.println("checking whether the "+s3.getId()+" is present in the set: "+s_id.contains(s3.getId()));
        System.out.println(s_id);
        
        //Map implementation
        Map <Integer,String> s_data = new HashMap<>();
        //Add Functionality
        s_data.put(s1.getId(),s1.getName());
        s_data.put(s2.getId(),s2.getName());
        s_data.put(s3.getId(),s3.getName());
        s_data.put(s4.getId(),s4.getName()); 
        System.out.println("\n\nMap Implementation");
        System.out.println("Before removing an element "+ s_data);
        //remove functionality
        s_data.remove(s1.getId());
        System.out.println("After removing an element "+ s_data);
        //search functionality
        s_data.containsKey(s3.getId());
        System.out.println("the name of the student_id "+s3.getId()+"is: "+s_data.get(s3.getId()));//returns name provided id of the student
        System.out.println(s_data);
        StudentManager obj=new StudentManager();
        //Taking input and adding functionalities to the above list,set and map
        Scanner sc= new Scanner(System.in);
        while(true){
        System.out.println(" \n\n Enter 'add' for adding New Student details ");
        System.out.println(" Enter 'remove' for removing student \n Enter 'search' for searching student name with student_id \n Enter 'display' for displaying details \n Enter 'exit' to exit from program");
        String i=sc.nextLine().toLowerCase();
        if(i.equals("exit")){
            System.out.println("exiting...");
            break;
        }
        else{
        switch (i) {
            case "add":
            System.out.println("enter student name");
            String n = sc.nextLine();
            s_name.add(n);
            System.out.println("enter unique student id");
            int roll=sc.nextInt();
            sc.nextLine();// Consume the leftover newline character
            s_id.add(roll);
            s_data.put(roll,n);
            obj.addStudent(n,roll);
            System.out.println("Student added!");
            break;
            case "remove":
            System.out.println("Enter the id of the student to be removed");
            int rem=sc.nextInt();
            sc.nextLine();// Consume the leftover newline character
            s_name.remove(s_data.get(rem));
            s_id.remove(rem);
            s_data.remove(rem);
            obj.removeStudent(rem);
            System.out.println("Student removed!");
            break;
            case "search":
            System.out.println("Enter the student id to be searched for name");
            int search_id=sc.nextInt();
            sc.nextLine();// Consume the leftover newline character
            if(!s_data.containsKey(search_id)){
                System.out.println("given id does not exist");
            }
            else{
                System.out.println("name of the student id given is " + obj.searchStudentName(search_id));
            }
            break;
            case "display":
            System.out.println("student data :\n"+obj.getStudentData());
            break;
            default:
            System.out.println("enter a valid option");
            break;
        }
 
    }
}
sc.close();
}
}