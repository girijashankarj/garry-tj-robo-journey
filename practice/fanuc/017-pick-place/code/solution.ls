/PROG PICKPLAC
/ATTR
OWNER		= MNEDITOR;
COMMENT		= "Study drill. FANUC rights. Educational; own risk.";
PROG_SIZE	= 0;
CREATE		= DATE 26-08-20  TIME 21:00:00;
MODIFIED	= DATE 26-08-20  TIME 21:00:00;
FILE_NAME	= ;
VERSION		= 0;
LINE_COUNT	= 0;
MEMORY_SIZE	= 0;
PROTECT		= READ_WRITE;
TCD:  STACK_SIZE	= 0,
      TASK_PRIORITY	= 50,
      TIME_SLICE	= 0,
      BUSY_LAMP_OFF	= 0,
      ABORT_REQUEST	= 0,
      PAUSE_REQUEST	= 0;
DEFAULT_GROUP	= 1,*,*,*,*;
CONTROL_CODE	= 00000000 00000000;
/APPL
/MN
   0:  ! FANUC retains all rights in its marks/software/manuals. Educational only. Use at your own consent and risk. See LEGAL.md ;
   1:  ! Union: pick/place. RI/RO PLACEHOLDERS. ;
   2:  UFRAME_NUM=1 ;
   3:  UTOOL_NUM=1 ;
   4:  J P[1:PkAp] 20% FINE    ;
   5:  L P[2:Pick] 80mm/sec FINE    ;
   6:  RO[1]=ON ;
   7:  WAIT RI[1]=ON TIMEOUT,LBL[90] ;
   8:  L P[1:PkAp] 80mm/sec FINE    ;
   9:  J P[3:PlAp] 20% FINE    ;
  10:  L P[4:Place] 80mm/sec FINE    ;
  11:  RO[1]=OFF ;
  12:  L P[3:PlAp] 80mm/sec FINE    ;
  13:  J PR[1:Home] 20% FINE    ;
  14:  JMP LBL[99] ;
  15:  LBL[90] ;
  16:  UALM[1] ;
  17:  ABORT ;
  18:  LBL[99] ;
  19:  END ;
/POS
/END
