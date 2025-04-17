# Landing-Erfolg

Installation Guide:


1. .NET Sachen:

1.1) Install .NET 8.0 : https://dotnet.microsoft.com/en-us/download/dotnet/8.0

1.2) Visual Studio : https://visualstudio.microsoft.com/de/vs/community/

2. SQL Server Database installation:
 
2.1) Microsoft SQL Server Datenbank Installation Guides:
  - https://www.der-windows-papst.de/2024/10/29/installationsanleitung-fuer-microsoft-sql-server-2022/
  - https://learn.microsoft.com/de-de/sql/database-engine/install-windows/install-sql-server?view=sql-server-ver16 

2.2) SQL Server Management Studio (SSMS): https://learn.microsoft.com/en-us/ssms/download-sql-server-management-studio-ssms

3. Create a Database:

  3.1) Create a new Database "test"

  3.2) Create a consultations table:
      
     # code to create a consultation table
     CREATE TABLE consultations (
       request_id INT INDETITY(1,1) PRIMARY KEY,
       name varchar(50) NULL,
       email varchar(50) NULL,
       topic varchar(50) NULL,
       message text NULL,
       Status BIT NOT NULL DEFAULT 0  
     );

    # code to create a slideshow table
    CREATE TABLE slideshow (
    	slide_id INT IDENTITY(1,1) PRIMARY KEY,
    	path varchar(250) NOT NULL
    );

4. Configure the Projekt:
  - Open ./appsettings.json and put the correct names into ConnectionString 
