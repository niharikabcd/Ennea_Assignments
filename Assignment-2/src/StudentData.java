import java.util.*;
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
public class StudentData {
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
        //Taking input and adding functionalities to the above list,set and map
        while(true){
        System.out.println(" \n\nenter add for adding New Student details ");
        System.out.println(" enter remove for removing student \n enter search for searching student name with student_id \n enter display for displaying details \n enter exit to exit from program");
        Scanner sc= new Scanner(System.in);
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
            s_id.add(roll);
            s_data.put(roll,n);
            System.out.println("Student added!");
            break;
            case "remove":
            System.out.println("enter the id of the student to be removed");
            int rem=sc.nextInt();
            s_name.remove(s_data.get(rem));
            s_id.remove(rem);
            s_data.remove(rem);
            System.out.println("Student removed!");
            break;
            case "search":
            System.out.println("enter the student id to be searched for name");
            int search_id=sc.nextInt();
            if(!s_data.containsKey(search_id)){
                System.out.println("given id does not exist");
            }
            else{
                System.out.println("name of the student id given is " + s_data.get(search_id));
            }
            break;
            case "display":
            System.out.println("student names(list):-\n"+ s_name +"\n student ids(set):-\n"+ s_id +"\n student names with respect to student_ids(map):-\n"+s_data);
            break;
            default:
                System.out.println("enter a valid option");
                break;
        }
 
    }
    sc.close();
}
}
}