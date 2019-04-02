Technical Notes
===============

# IDE Build issue

## Compilation error on mvn clean & mvn compile.
For unknown reason the classes files are note generated in /target/classes
Work-around: After mvn clean, In the project explorer, right click and do build of the source code. 

# H2 Database

## Browse table from H2 console
Change the db URL to `jdbc:h2:mem:testdb`, otherwise you will se no tables